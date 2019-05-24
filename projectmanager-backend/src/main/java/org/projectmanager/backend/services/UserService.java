package org.projectmanager.backend.services;

import java.util.List;

import org.projectmanager.backend.entities.User;

public interface UserService {
	
	boolean addUser(User user);

	List<User> getUserList();

	boolean updateTask(User user);
	
	User getUserByTaskId(Integer taskId);

	User getUserByProjectId(Integer projectId);
}
