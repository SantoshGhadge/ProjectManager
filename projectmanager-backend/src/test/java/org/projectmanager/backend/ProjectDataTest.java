package org.projectmanager.backend;

import static org.junit.Assert.assertEquals;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.projectmanager.backend.dao.ProjectDao;
import org.projectmanager.backend.dao.UserDao;
import org.projectmanager.backend.entities.Project;
import org.projectmanager.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ProjectDataTest {
	
	@Autowired
	private ProjectDao projectDao;
	
	@Autowired
	private UserDao userDao;
	
	@Before
	public void setUp(){
		User user = new User();
		user.setFirstName("TestUserF");
		user.setLastName("testUserL");
		user.setEmpId(12345);
		
		userDao.save(user);
	}
	
	@Test
	public void addProjectTest(){
		Project project = new Project();
		project.setProject("Test1");
		project.setStartDate(new Date());
		project.setEndDate(new Date());
		project.setPriority(10);
		project.setManagerId(12345);
		
		projectDao.save(project);
		
		List<Project> projects = projectDao.findAll();
		
		assertEquals(1,projects.size());
		assertEquals("Test1", projects.get(0).getProject());
	}
	
	@Test
	public void getAllProjectDetails(){
		
		Project project = new Project();
		project.setProject("Test1");
		project.setStartDate(new Date());
		project.setEndDate(new Date());
		project.setPriority(10);
		project.setManagerId(12345);
		projectDao.save(project);
		
		Project project2 = new Project();
		project2.setProject("Test2");
		project2.setStartDate(new Date());
		project2.setEndDate(new Date());
		project2.setPriority(10);
		project2.setManagerId(12345);
		
		projectDao.save(project2);
	
		List<Project> projects = projectDao.getAllProjectDetails();
		assertEquals(2,projects.size());
		assertEquals("Test1", projects.get(0).getProject());
		assertEquals("Test2", projects.get(1).getProject());
	}
	
	@Test
	public void suspendTest(){
		
		Project project = new Project();
		project.setProject("Test1");
		project.setStartDate(new Date());
		project.setEndDate(new Date());
		project.setPriority(10);
		project.setManagerId(12345);
		projectDao.save(project);
		
		projectDao.deleteById(project.getProjectId());
		
		Optional<Project> deletedProject = projectDao.findById(project.getProjectId());
		
		assertEquals(Optional.empty(),deletedProject);
		
		
	}

}
