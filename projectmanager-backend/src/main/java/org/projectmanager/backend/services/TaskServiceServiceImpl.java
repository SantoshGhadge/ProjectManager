package org.projectmanager.backend.services;

import java.util.List;

import org.projectmanager.backend.dao.TaskDao;
import org.projectmanager.backend.entities.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class TaskServiceServiceImpl implements TaskService {

	@Autowired
	private TaskDao taskDao;
	
	@Transactional
	@Override
	public boolean addTask(Task task) {
		Task taskObj = this.taskDao.save(task);
		this.taskDao.updateUser(taskObj.getTaskId(), task.getUserId());
		return true;
	}

	@Transactional
	@Override
	public List<Task> getParentTaskList() {
		return this.taskDao.findAll();
	}
	
	@Transactional
	@Override
	public Task getTaskById(Integer taskId) {
		return this.taskDao.findTaskById(taskId);
		
	}

	@Transactional
	@Override
	public boolean endTask(Integer taskId) {
		this.taskDao.deleteById(taskId);
		return true;
	}
	
	@Transactional
	@Override
	public boolean updateTask(Task task) {
		task.setTaskId(task.getTaskId());
		this.taskDao.save(task);
		this.taskDao.updateTaskIdToNull(task.getTaskId());
		this.taskDao.updateUser(task.getTaskId(), task.getUserId());
		return true;
	}

	@Override
	public List<Task> getAllTaskListByProjectId(Integer projectId) {
		List<Task> taskList = this.taskDao.getAllTaskListByProjectId(projectId);
		return taskList;
	}

}
