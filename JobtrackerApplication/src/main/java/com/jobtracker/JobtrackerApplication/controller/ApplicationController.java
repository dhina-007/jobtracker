package com.jobtracker.JobtrackerApplication.controller;


import com.jobtracker.JobtrackerApplication.model.Application;
import com.jobtracker.JobtrackerApplication.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private final ApplicationService service;

    public ApplicationController(ApplicationService service) { this.service = service; }

    @GetMapping
    public List<Application> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getOne(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Application> create( @RequestBody Application app) {
        Application saved = service.save(app);
        return ResponseEntity.created(URI.create("/api/applications/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> update(@PathVariable Long id, @RequestBody Application app) {
        return service.findById(id).map(existing -> {
            existing.setCompanyName(app.getCompanyName());
            existing.setJobTitle(app.getJobTitle());
            existing.setDateApplied(app.getDateApplied());
            existing.setJobLink(app.getJobLink());
            existing.setStatus(app.getStatus());
            existing.setNotes(app.getNotes());
            Application updated = service.save(existing);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.findById(id).map(existing -> {
            service.delete(id);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status-counts")
    public List<Map<String,Object>> statusCounts() {
        return service.statusCounts();
    }
}
