package com.platform.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/judge")
public class JudgeController {

    @PostMapping("/run")
    public ResponseEntity<?> runCode(@RequestBody Map<String, Object> body) {
        String code = (String) body.get("code");
        String language = (String) body.get("language");
        if (code == null || language == null)
            return ResponseEntity.badRequest().body(Map.of("error", "code and language are required"));

        Path tmpDir = null;
        try {
            tmpDir = Files.createTempDirectory("judge_");
            String[] cmd = prepareExecution(tmpDir, language, code);
            if (cmd == null)
                return ResponseEntity.badRequest().body(Map.of("error", "Unsupported language: " + language));

            ProcessBuilder pb = new ProcessBuilder(cmd);
            pb.directory(tmpDir.toFile());
            pb.environment().clear();
            if (System.getenv("PATH") != null)
                pb.environment().put("PATH", System.getenv("PATH"));

            Process process = pb.start();
            boolean finished = process.waitFor(10, TimeUnit.SECONDS);

            String stdOut = new String(process.getInputStream().readAllBytes()).trim();
            String stdErr = new String(process.getErrorStream().readAllBytes()).trim();

            if (!finished) {
                process.destroyForcibly();
                return ResponseEntity.ok(Map.of("stdout", stdOut, "stderr", stdErr, "exitCode", -1, "timedOut", true));
            }

            int exitCode = process.exitValue();
            return ResponseEntity.ok(Map.of("stdout", stdOut, "stderr", stdErr, "exitCode", exitCode, "timedOut", false));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        } finally {
            if (tmpDir != null) try {
                try (var files = Files.walk(tmpDir)) { files.sorted(Comparator.reverseOrder()).forEach(p -> { try { Files.deleteIfExists(p); } catch (Exception ignored) {} }); }
            } catch (Exception ignored) {}
        }
    }

    private String[] prepareExecution(Path dir, String lang, String code) throws IOException, InterruptedException {
        return switch (lang) {
            case "python" -> {
                Files.writeString(dir.resolve("solution.py"), code);
                yield new String[]{"python3", "solution.py"};
            }
            case "javascript" -> {
                Files.writeString(dir.resolve("solution.js"), code);
                yield new String[]{"node", "solution.js"};
            }
            case "java" -> {
                Files.writeString(dir.resolve("Solution.java"), code);
                ProcessBuilder pb = new ProcessBuilder("javac", "Solution.java");
                pb.directory(dir.toFile());
                pb.environment().clear();
                if (System.getenv("PATH") != null) pb.environment().put("PATH", System.getenv("PATH"));
                Process cp = pb.start();
                boolean ok = cp.waitFor(15, TimeUnit.SECONDS);
                if (!ok) { cp.destroyForcibly(); throw new IOException("javac timed out"); }
                if (cp.exitValue() != 0) {
                    String err = new String(cp.getErrorStream().readAllBytes());
                    Files.writeString(dir.resolve("result.txt"), "COMPILE_ERROR\n" + err);
                    yield new String[]{"cat", "result.txt"};
                }
                yield new String[]{"java", "-cp", dir.toString(), "Solution"};
            }
            case "c" -> {
                Files.writeString(dir.resolve("solution.c"), code);
                ProcessBuilder pb = new ProcessBuilder("gcc", "solution.c", "-o", "solution");
                pb.directory(dir.toFile());
                pb.environment().clear();
                if (System.getenv("PATH") != null) pb.environment().put("PATH", System.getenv("PATH"));
                Process cp = pb.start();
                boolean ok = cp.waitFor(15, TimeUnit.SECONDS);
                if (!ok) { cp.destroyForcibly(); throw new IOException("gcc timed out"); }
                if (cp.exitValue() != 0) {
                    String err = new String(cp.getErrorStream().readAllBytes());
                    Files.writeString(dir.resolve("result.txt"), "COMPILE_ERROR\n" + err);
                    yield new String[]{"cat", "result.txt"};
                }
                yield new String[]{"./solution"};
            }
            default -> null;
        };
    }
}
