package org.projectmanager.backend.dao;

import java.util.List;

import org.projectmanager.backend.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TaskDao extends JpaRepository<Task, Integer> {

	/*boolean addTask(Task task);*/
	
	@Query(value ="SELECT * FROM task t where t.task_id=?1", nativeQuery = true) 
	Task findTaskById(Integer taskId);
	
	
	@Modifying
	@Query(value ="update user u set u.Task_ID=?1 where u.Employee_ID=?2", nativeQuery = true) 
	int updateUser(Integer taskId, Integer userId);
	
	@Modifying
	@Query(value ="update user u set u.Task_ID=null where u.Task_ID=?1", nativeQuery = true) 
	int updateTaskIdToNull(Integer taskId);
	
	@Query(value ="SELECT * FROM task t where t.project_id=?1", nativeQuery = true) 
	List<Task> getAllTaskListByProjectId(Integer projectId);
}
