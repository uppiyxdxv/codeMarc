package com.platform.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.*;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final RestTemplate rest;

    public InterviewController() {
        var factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
        factory.setConnectTimeout((int) Duration.ofSeconds(15).toMillis());
        factory.setReadTimeout((int) Duration.ofSeconds(30).toMillis());
        this.rest = new RestTemplate(factory);
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generate(@RequestBody Map<String, String> body) {
        String apiKey = body.getOrDefault("apiKey", "").trim();
        String resume = body.getOrDefault("resume", "").trim();
        String role = body.getOrDefault("role", "Software Engineer").trim();
        if (resume.length() < 40)
            return ResponseEntity.badRequest().body(Map.of("error", "Resume too short. Paste more experience, projects, skills."));
        if (apiKey.isEmpty()) {
            return ResponseEntity.ok(Map.of("source", "offline", "questions", generateOffline(resume, role)));
        }
        try {
            String sys = "You are an experienced HR interviewer. Given a resume and target role, write 6 HR-round interview questions. Respond with ONLY valid JSON: {\"questions\":[\"...\",\"...\"]}";
            String user = "Target role: " + role + "\nResume:\n" + resume;
            String text = callClaude(apiKey, sys, user);
            List<String> questions = extractQuestions(text);
            return ResponseEntity.ok(Map.of("source", "claude", "questions", questions));
        } catch (Exception e) {
            List<String> fallback = generateOffline(resume, role);
            return ResponseEntity.ok(Map.of("source", "offline", "questions", fallback, "warning", "Claude API error: " + e.getMessage()));
        }
    }

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluate(@RequestBody Map<String, String> body) {
        String apiKey = body.getOrDefault("apiKey", "").trim();
        String question = body.getOrDefault("question", "");
        String answer = body.getOrDefault("answer", "");
        if (answer.isBlank())
            return ResponseEntity.badRequest().body(Map.of("error", "Answer cannot be empty"));
        if (apiKey.isEmpty()) {
            return ResponseEntity.ok(Map.of("source", "offline", "score", offlineScore(answer), "feedback", offlineFeedback(answer)));
        }
        try {
            String sys = "You are an HR interview coach. Given one HR question and the candidate's answer, give brief feedback. Respond with ONLY JSON: {\"score\":<integer 1-10>,\"feedback\":\"2-3 sentences\"}";
            String user = "Question: " + question + "\nAnswer: " + answer;
            String text = callClaude(apiKey, sys, user);
            Map<String, Object> parsed = extractScoreFeedback(text);
            return ResponseEntity.ok(Map.of("source", "claude", "score", parsed.get("score"), "feedback", parsed.get("feedback")));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("source", "offline", "score", offlineScore(answer), "feedback", offlineFeedback(answer), "warning", "Claude API error: " + e.getMessage()));
        }
    }

    @PostMapping("/summary")
    public ResponseEntity<?> summary(@RequestBody Map<String, Object> body) {
        String apiKey = body.getOrDefault("apiKey", "").toString().trim();
        String role = body.getOrDefault("role", "Software Engineer").toString();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> transcript = (List<Map<String, Object>>) body.get("transcript");
        if (transcript == null || transcript.isEmpty())
            return ResponseEntity.badRequest().body(Map.of("error", "Transcript is empty"));
        if (apiKey.isEmpty()) {
            return ResponseEntity.ok(Map.of("source", "offline", "overall", offlineSummary(transcript, role)));
        }
        try {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < transcript.size(); i++) {
                Map<String, Object> t = transcript.get(i);
                sb.append("Q").append(i + 1).append(": ").append(t.get("question")).append("\n");
                sb.append("A").append(i + 1).append(": ").append(t.get("answer")).append("\n\n");
            }
            String sys = "You are an HR interview coach summarizing a mock interview. Respond with ONLY JSON: {\"summary\":\"3-4 sentences\",\"strengths\":[\"...\",\"...\"],\"improve\":[\"...\",\"...\"]}";
            String user = "Role: " + role + "\n\nTranscript:\n" + sb;
            String text = callClaude(apiKey, sys, user);
            Map<String, Object> parsed = extractSummary(text);
            return ResponseEntity.ok(Map.of("source", "claude", "overall", parsed));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("source", "offline", "overall", offlineSummary(transcript, role), "warning", "Claude API error: " + e.getMessage()));
        }
    }

    /* ---- Claude API call ---- */
    private String callClaude(String apiKey, String system, String user) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");
        Map<String, Object> body = Map.of(
                "model", "claude-sonnet-4-20250514",
                "max_tokens", 1000,
                "system", system,
                "messages", List.of(Map.of("role", "user", "content", user)));
        HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, headers);
        ResponseEntity<Map> resp = rest.postForEntity("https://api.anthropic.com/v1/messages", req, Map.class);
        if (!resp.getStatusCode().is2xxSuccessful() || resp.getBody() == null)
            throw new RuntimeException("Anthropic returned " + resp.getStatusCode());
        List<Map<String, Object>> content = (List<Map<String, Object>>) resp.getBody().get("content");
        if (content == null || content.isEmpty()) throw new RuntimeException("Empty response");
        return content.stream().map(b -> (String) b.get("text")).reduce("", String::concat);
    }

    /* ---- JSON extractors ---- */
    private List<String> extractQuestions(String text) {
        String cleaned = text.replaceAll("```json", "").replaceAll("```", "").trim();
        int s = Math.min(cleaned.indexOf('{'), cleaned.indexOf('['));
        String json = s >= 0 ? cleaned.substring(s) : cleaned;
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> obj = new com.fasterxml.jackson.databind.ObjectMapper().readValue(json, Map.class);
            @SuppressWarnings("unchecked")
            List<String> qs = (List<String>) obj.get("questions");
            if (qs != null && !qs.isEmpty()) return qs;
        } catch (Exception ignored) {}
        return generateOffline("", "Software Engineer");
    }

    private Map<String, Object> extractScoreFeedback(String text) {
        String cleaned = text.replaceAll("```json", "").replaceAll("```", "").trim();
        int s = cleaned.indexOf('{');
        String json = s >= 0 ? cleaned.substring(s) : cleaned;
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> obj = new com.fasterxml.jackson.databind.ObjectMapper().readValue(json, Map.class);
            return obj;
        } catch (Exception ignored) {}
        return Map.of("score", offlineScore(""), "feedback", "Could not parse response.");
    }

    private Map<String, Object> extractSummary(String text) {
        String cleaned = text.replaceAll("```json", "").replaceAll("```", "").trim();
        int s = cleaned.indexOf('{');
        String json = s >= 0 ? cleaned.substring(s) : cleaned;
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> obj = new com.fasterxml.jackson.databind.ObjectMapper().readValue(json, Map.class);
            return obj;
        } catch (Exception ignored) {}
        return offlineSummary(List.of(), "Software Engineer");
    }

    /* ---- Offline fallbacks ---- */
    private static final String[][] BEHAVIORAL = {
        {"Tell me about a time you faced a challenge. How did you handle it?"},
        {"Describe a situation where you worked as part of a team to achieve a goal."},
        {"Tell me about a time you received feedback. How did you respond?"},
        {"Describe a situation where you had to meet a tight deadline."},
        {"Tell me about a project you are most proud of and why."},
        {"Describe a time you had to learn something new quickly."},
        {"Tell me about a conflict you resolved with someone."},
        {"Describe a time you showed leadership or initiative."},
    };
    private static final String[] MOTIVATION = {
        "Why did you choose your career path?",
        "What is your greatest professional achievement?",
        "Where do you see yourself in five years?",
        "What motivates you to do your best work?",
        "Why are you interested in this role?"
    };

    private List<String> generateOffline(String resume, String role) {
        List<String> qs = new ArrayList<>();
        Random rand = new Random();
        List<String[]> pool = new ArrayList<>(Arrays.asList(BEHAVIORAL));
        Collections.shuffle(pool, rand);
        for (int i = 0; i < 3 && i < pool.size(); i++) qs.add(pool.get(i)[0]);
        qs.add(MOTIVATION[rand.nextInt(MOTIVATION.length)]);
        String lower = resume.toLowerCase();
        if (lower.contains("java") || lower.contains("python") || lower.contains("javascript"))
            qs.add("Your background includes programming skills. Can you describe a project where you applied them?");
        qs.add("Looking at your experience, what makes you a strong fit for this " + role + " role?");
        while (qs.size() < 6) {
            String[] pick = BEHAVIORAL[rand.nextInt(BEHAVIORAL.length)];
            if (!qs.contains(pick[0])) qs.add(pick[0]);
        }
        return qs.subList(0, Math.min(qs.size(), 7));
    }

    private int offlineScore(String answer) {
        int s = 5;
        int wc = answer.split("\\s+").length;
        if (wc < 15) s -= 2;
        else if (wc > 25) s += 1;
        if (answer.toLowerCase().matches(".*\\b(for example|specifically|one time|i handled|i resolved|i led|i created|i built|i implemented)\\b.*")) s += 2;
        else s -= 1;
        long kw = Arrays.stream("communicat,problem,team,leader,result,achieved,collaborat,solved,learn,mentor,delivered,improved,launched".split(",")).filter(w -> answer.toLowerCase().contains(w)).count();
        if (kw >= 3) s += 1;
        if (answer.toLowerCase().matches(".*\\b(achieved|result|delivered|increased|decreased|saved|improved by|reduced)\\b.*")) s += 1;
        return Math.max(1, Math.min(10, s));
    }

    private String offlineFeedback(String answer) {
        StringBuilder fb = new StringBuilder();
        int wc = answer.split("\\s+").length;
        if (wc < 15) fb.append("Too brief — expand with specific details. ");
        if (!answer.toLowerCase().matches(".*\\b(for example|specifically|i handled|i resolved|i built)\\b.*"))
            fb.append("Include a real example from your experience. ");
        if (fb.length() == 0) fb.append("Clear and relevant. ");
        fb.append("Try the STAR method (Situation, Task, Action, Result).");
        return fb.toString();
    }

    private Map<String, Object> offlineSummary(List<Map<String, Object>> transcript, String role) {
        int total = 0, count = 0;
        for (Map<String, Object> t : transcript) {
            Object sc = t.get("score");
            if (sc instanceof Number) { total += ((Number) sc).intValue(); count++; }
        }
        double avg = count > 0 ? Math.round((double) total / count * 10.0) / 10.0 : 0;
        String summary;
        List<String> strengths = new ArrayList<>();
        List<String> improve = new ArrayList<>();
        if (avg >= 8) {
            summary = "Excellent interview! Strong communication and compelling examples for the " + role + " role.";
            strengths.add("Strong overall performance with detailed answers.");
            strengths.add("Good use of examples.");
        } else if (avg >= 6) {
            summary = "Good effort! Your answers show relevant experience. Focus on STAR structure and metrics for even stronger responses.";
            strengths.add("Solid foundation with key points covered.");
            improve.add("Add more specific examples. Use STAR method.");
        } else if (avg >= 4) {
            summary = "You have good material but need to work on structure and delivery. Prepare 5-7 stories from your experience.";
            improve.add("Add more specific examples. Use STAR method.");
            improve.add("Quantify your achievements.");
        } else {
            summary = "This is a good starting point. Write down specific achievements and practice describing them in 2-minute responses.";
            improve.add("Expand answers with context, action, and result.");
            improve.add("Quantify your achievements.");
        }
        return Map.of("summary", summary, "strengths", strengths, "improve", improve, "avg", avg);
    }
}
