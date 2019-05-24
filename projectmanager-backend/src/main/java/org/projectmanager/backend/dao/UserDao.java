/**
 * 
 */
package org.projectmanager.backend.dao;

import org.projectmanager.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDao extends JpaRepository<User, Integer> {
	
	@Query(value ="SELECT * FROM user t where t.task_id=?1", nativeQuery = true) 
	User findUserByTaskId(Integer taskId);
	
	@Query(value ="SELECT * FROM user t where t.Project_ID=?1", nativeQuery = true) 
	User findUserByProjectId(Integer project);

}
