package org.projectmanager.backend.services;

import java.util.List;

import org.projectmanager.backend.entities.Task;

public interface TaskService {
	
	boolean addTask(Task task);
	
	List<Task> getParentTaskList();
	
	Task getTaskById(Integer taskId);

	boolean endTask(Integer taskId);

	boolean updateTask(Task task);

	List<Task> getAllTaskListByProjectId(Integer projectId);
}
