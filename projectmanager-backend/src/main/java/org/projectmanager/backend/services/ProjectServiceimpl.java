package org.projectmanager.backend.services;

import java.util.List;

import org.projectmanager.backend.dao.ProjectDao;
import org.projectmanager.backend.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectServiceimpl implements ProjectService {
	
	@Autowired
	private ProjectDao projectDao;
	
	@Transactional
	@Override
	public boolean addProject(Project project) {
		Project proj = this.projectDao.save(project);
		this.projectDao.updateUser(proj.getProjectId(), project.getManagerId());
		return true;
	}

	@Override
	public List<Project> getAllProjectDetails() {
		return this.projectDao.getAllProjectDetails();
	}

	@Transactional
	@Override
	public boolean updateProject(Project project) {
		this.projectDao.updateUserToNull(project.getProjectId());
		this.projectDao.save(project);
		this.projectDao.updateUser(project.getProjectId(), project.getManagerId());
		return true;
		
	}

	@Override
	public boolean suspendProject(Integer projectId) {
		this.projectDao.deleteById(projectId);
		return true;
	}

}
