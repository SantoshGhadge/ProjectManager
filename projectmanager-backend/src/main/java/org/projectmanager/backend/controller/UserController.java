package org.projectmanager.backend.controller;

import java.util.List;

import org.projectmanager.backend.entities.User;
import org.projectmanager.backend.services.UserService;
import org.projectmanager.backend.utility.ProjectManagerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping(value = "/api/user")
@JsonIgnoreProperties
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(method = RequestMethod.POST)
	public void addUser(@RequestBody User user) throws ProjectManagerException{
		try{
			this.userService.addUser(user);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while adding new user :" +exp.getMessage());
		}
	}
	
	@GetMapping("/getUserList")
	public List<User> getUserList() throws ProjectManagerException{
		try{
			return this.userService.getUserList();
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while fetching user list:"+exp.getMessage());
		}
			
	}
	
	@PutMapping("/updateUser/{userId}")
	public void updateTask(@RequestBody User user, @PathVariable Integer userId) throws ProjectManagerException{
		try{
			user.setUserId(userId);
			this.userService.updateTask(user);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while updating user , id:"+userId+" : "+exp.getMessage());
		}
	}
	
	@GetMapping("/{taskId}")
	public User getUserByTaskId(@PathVariable("taskId") Integer taskId) throws ProjectManagerException{
		try{
			return this.userService.getUserByTaskId(taskId);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while fetching user:"+taskId+" : "+exp.getMessage());
		}
	}
	
	@GetMapping("/getUserByProjectId/{projectId}")
	public User getUserByProjectId(@PathVariable("projectId") Integer projectId) throws ProjectManagerException{
		try{
			return this.userService.getUserByProjectId(projectId);
		}catch(Exception exp){
			throw new ProjectManagerException("Exception occured while fetching user:"+projectId+" : "+exp.getMessage());
		}
	}
	

}
