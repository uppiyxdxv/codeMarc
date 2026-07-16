package com.platform.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_questions")
public class Quiz {

    @Id
    private String id;

    @Column(nullable = false)
    private String domain;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(columnDefinition = "TEXT")
    private String code;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String optionsJson;

    private int correctIndex;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    public Quiz() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getOptionsJson() { return optionsJson; }
    public void setOptionsJson(String optionsJson) { this.optionsJson = optionsJson; }
    public int getCorrectIndex() { return correctIndex; }
    public void setCorrectIndex(int correctIndex) { this.correctIndex = correctIndex; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
