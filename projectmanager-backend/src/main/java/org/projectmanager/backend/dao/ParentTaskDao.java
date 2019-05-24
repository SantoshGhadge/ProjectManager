package org.projectmanager.backend.dao;

import org.projectmanager.backend.entities.ParentTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParentTaskDao extends JpaRepository<ParentTask, Integer> {

}
