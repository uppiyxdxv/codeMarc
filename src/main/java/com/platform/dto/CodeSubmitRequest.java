package com.platform.dto;

import jakarta.validation.constraints.NotBlank;

public class CodeSubmitRequest {
    @NotBlank
    private String problemId;
    @NotBlank
    private String code;
    @NotBlank
    private String language;

    public String getProblemId() { return problemId; }
    public void setProblemId(String problemId) { this.problemId = problemId; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
