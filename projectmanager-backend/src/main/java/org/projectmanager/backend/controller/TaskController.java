package org.projectmanager.backend.controller;

import java.util.List;

import org.projectmanager.backend.entities.Task;
import org.projectmanager.backend.services.TaskService;
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
@RequestMapping(value = "/api/tasks")
@JsonIgnoreProperties
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@RequestMapping(method = RequestMethod.POST)
	public void addTask(@RequestBody Task task) throws ProjectManagerException{
		try{
			this.taskService.addTask(task);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while adding new task :" +exp.getMessage());
		}
	}
	
	@PutMapping("/updateTask/{taskId}")
	public void updateTask(@RequestBody Task task, @PathVariable Integer taskId) throws ProjectManagerException{
		try{
			task.setTaskId(taskId);
			this.taskService.updateTask(task);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while adding updating task id:"+taskId+" : "+exp.getMessage());
		}
	}
	
	@GetMapping("/getAllTaskList")
	public List<Task> getAllTaskList() throws ProjectManagerException{
		try{
			return this.taskService.getParentTaskList();
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while fetching task list:"+exp.getMessage());
		}
			
	}
	
	@GetMapping("/{taskId}")
	public Task getTaskById(@PathVariable("taskId") Integer taskId) throws ProjectManagerException{
		try{
			return this.taskService.getTaskById(taskId);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while fetching task:"+taskId+" : "+exp.getMessage());
		}
	}
	
	@DeleteMapping("/{taskId}")
	public boolean endTask(@PathVariable("taskId") Integer taskId) throws ProjectManagerException{
		try{
			return this.taskService.endTask(taskId);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while ending task:"+taskId+" : "+exp.getMessage());
		}
	}
	
	@GetMapping("/getAllTaskListByProjectId/{projectId}")
	public List<Task> getAllTaskListByProjectId(@PathVariable("projectId") Integer projectId) throws ProjectManagerException{
		try{
			return this.taskService.getAllTaskListByProjectId(projectId);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while fetching task list:"+exp.getMessage());
		}
			
	}

}
