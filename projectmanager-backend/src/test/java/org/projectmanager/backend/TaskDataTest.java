package org.projectmanager.backend;

import static org.junit.Assert.assertEquals;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.projectmanager.backend.dao.TaskDao;
import org.projectmanager.backend.dao.UserDao;
import org.projectmanager.backend.entities.ParentTask;
import org.projectmanager.backend.entities.Task;
import org.projectmanager.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TaskDataTest {
	
	@Autowired
	private TaskDao taskDao;
	
	@Autowired
	private UserDao userDao;
	
	@Before
	public void setUp(){
	}
	
	
	@Test
	public void addTaskTest(){
		SimpleDateFormat  dateFormatter =  
				new SimpleDateFormat("dd-MM-yyyy");
		
		Task task = new Task();
		task.setTask("TaskTest1");
		task.setStartDate(new Date());
		task.setEndDate(new Date());
		task.setProjectId(1);
		task.setPriority(20);
		task.setUserId(1);
		ParentTask parentTask = new ParentTask();
		parentTask.setParentId(1);
		parentTask.setParentTask("TaskTest1");
		task.setParentTask(parentTask);
		
		User user = new User();
		user.setFirstName("TestUserF");
		user.setLastName("testUserL");
		user.setEmpId(12345);
		userDao.save(user);
		
		this.taskDao.save(task);
		//this.taskDao.updateUser(task.getTaskId(), user.getEmpId());
		
		List<Task> tasks =  this.taskDao.findAll();
		assertEquals(1,tasks.size());
		assertEquals("TaskTest1", tasks.get(0).getParentTask().getParentTask());
		assertEquals("TaskTest1", tasks.get(0).getTask());
		assertEquals(dateFormatter.format(new Date()), dateFormatter.format(tasks.get(0).getStartDate()));
		assertEquals(dateFormatter.format(new Date()), dateFormatter.format(tasks.get(0).getEndDate()));
	}
	
	@Test
	public void endTaskById(){
		
		Task task = new Task();
		task.setTask("TaskTest1");
		task.setStartDate(new Date());
		task.setEndDate(new Date());
		task.setProjectId(1);
		task.setPriority(20);
		task.setUserId(1);
		ParentTask parentTask = new ParentTask();
		parentTask.setParentId(1);
		parentTask.setParentTask("TaskTest1");
		task.setParentTask(parentTask);
		
		User user = new User();
		user.setFirstName("TestUserF");
		user.setLastName("testUserL");
		user.setEmpId(12345);
		userDao.save(user);
		
		this.taskDao.save(task);
		this.taskDao.deleteById(task.getTaskId());
		
		Task taskResult = this.taskDao.findTaskById(task.getTaskId());
		assertEquals(null,taskResult);
	}
}
