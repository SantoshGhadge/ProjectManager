package org.projectmanager.backend.services;

import java.util.List;

import org.projectmanager.backend.dao.UserDao;
import org.projectmanager.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public boolean addUser(User user) {
		this.userDao.save(user);
		return true;
	}

	@Override
	public List<User> getUserList() {
		return this.userDao.findAll();
	}

	@Override
	public boolean updateTask(User user) {
		this.userDao.save(user);
		return true;
	}

	@Override
	public User getUserByTaskId(Integer taskId) {
		return this.userDao.findUserByTaskId(taskId);
	}

	@Override
	public User getUserByProjectId(Integer projectId) {
		return this.userDao.findUserByProjectId(projectId);
	}
	
	

}
