package org.projectmanager.backend.services;

import java.util.List;

import org.projectmanager.backend.entities.Project;

public interface ProjectService {
	
	boolean addProject(Project task);

	List<Project> getAllProjectDetails();

	boolean updateProject(Project project);

	boolean suspendProject(Integer projectId);
}
