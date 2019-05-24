package org.projectmanager.backend.controller;

import java.util.List;

import org.projectmanager.backend.entities.Project;
import org.projectmanager.backend.entities.User;
import org.projectmanager.backend.services.ProjectService;
import org.projectmanager.backend.utility.ProjectManagerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/project")
@JsonIgnoreProperties
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@RequestMapping(method = RequestMethod.POST)
	public void addProject(@RequestBody Project project) throws ProjectManagerException{
		try{
			this.projectService.addProject(project);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while adding new project :" +exp.getMessage());
		}
	}
	
	@GetMapping("/getProjectList")
	public List<Project> getProjectList() throws ProjectManagerException{
		try{
			return this.projectService.getAllProjectDetails();
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while fetching project list:"+exp.getMessage());
		}
			
	}
	
	@PutMapping("/updateProject/{projectId}")
	public void updateProject(@RequestBody Project project, @PathVariable Integer projectId) throws ProjectManagerException{
		try{
			project.setProjectId(projectId);
			this.projectService.updateProject(project);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while updating project , id:"+projectId+" : "+exp.getMessage());
		}
	}
	
	@DeleteMapping("/{projectId}")
	public boolean suspendProject(@PathVariable("projectId") Integer projectId) throws ProjectManagerException{
		try{
			return this.projectService.suspendProject(projectId);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while suspending project:"+projectId+" : "+exp.getMessage());
		}
	}
}
