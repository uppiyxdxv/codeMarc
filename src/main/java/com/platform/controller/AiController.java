package com.platform.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final RestTemplate rest = new RestTemplate();

    @PostMapping("/anthropic")
    public ResponseEntity<?> proxyAnthropic(@RequestBody Map<String, String> body) {
        String apiKey = body.get("apiKey");
        String system = body.get("system");
        String user = body.get("user");
        if (apiKey == null || apiKey.isBlank())
            return ResponseEntity.badRequest().body(Map.of("error", "API key is required"));
        if (system == null || user == null)
            return ResponseEntity.badRequest().body(Map.of("error", "system and user are required"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");

        Map<String, Object> claudeBody = Map.of(
            "model", "claude-sonnet-4-20250514",
            "max_tokens", 1000,
            "system", system,
            "messages", java.util.List.of(Map.of("role", "user", "content", user))
        );

        try {
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(claudeBody, headers);
            ResponseEntity<Map> response = rest.postForEntity(
                "https://api.anthropic.com/v1/messages", request, Map.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", "Anthropic proxy failed: " + e.getMessage()));
        }
    }
}
