package com.jobtracker.JobtrackerApplication.service;

import com.jobtracker.JobtrackerApplication.model.Application;
import com.jobtracker.JobtrackerApplication.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ApplicationService {
    private final ApplicationRepository repo;

    public ApplicationService(ApplicationRepository repo) { this.repo = repo; }

    public List<Application> findAll() { return repo.findAll(); }
    public Optional<Application> findById(Long id) { return repo.findById(id); }
    public Application save(Application app) { return repo.save(app); }
    public void delete(Long id) { repo.deleteById(id); }

    public List<Map<String, Object>> statusCounts() {
        List<Object[]> rows = repo.countByStatus();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] r : rows) {
            Map<String,Object> m = new HashMap<>();
            m.put("status", r[0] == null ? "UNKNOWN" : r[0].toString());
            m.put("count", ((Number) r[1]).longValue());
            result.add(m);
        }
        return result;
    }
}