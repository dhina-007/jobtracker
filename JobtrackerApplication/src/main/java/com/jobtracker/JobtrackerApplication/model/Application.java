package com.jobtracker.JobtrackerApplication.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;


import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "company_name", nullable = false)
    private String companyName;


    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "date_applied")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateApplied;

    @Column(name = "job_link")
    private String jobLink;

    @Column(name = "status")
    private String status; // Applied, Interview, Offer, Rejected

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    public Application() {}

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public LocalDate getDateApplied() { return dateApplied; }
    public void setDateApplied(LocalDate dateApplied) { this.dateApplied = dateApplied; }

    public String getJobLink() { return jobLink; }
    public void setJobLink(String jobLink) { this.jobLink = jobLink; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}