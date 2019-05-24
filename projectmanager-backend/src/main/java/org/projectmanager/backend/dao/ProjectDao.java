package org.projectmanager.backend.dao;

import java.util.List;

import org.projectmanager.backend.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProjectDao extends JpaRepository<Project, Integer> {
	
	@Modifying
	@Query(value ="update user u set u.Project_ID=?1 where u.Employee_ID=?2", nativeQuery = true) 
	int updateUser(Integer projectId, Integer employeeId);
	
	
	@Query(value ="SELECT p.Project_ID,p.Project,p.priority,p.Start_Date,p.End_Date,count(t.Task_ID) as noOfTasks FROM project p left join task t on p.Project_ID = t.Project_ID group by p.Project_ID", nativeQuery = true) 
	List<Project> getAllProjectDetails();
	
	@Modifying
	@Query(value ="update user u set u.Project_ID=null where u.Project_ID=?1", nativeQuery = true) 
	int updateUserToNull(Integer Project_ID);
}

