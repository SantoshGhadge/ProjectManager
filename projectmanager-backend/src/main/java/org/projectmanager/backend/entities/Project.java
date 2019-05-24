package org.projectmanager.backend.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name="project")
@JsonIgnoreProperties
public class Project {
	
	@Id //primary key
	@GeneratedValue(strategy=GenerationType.IDENTITY) //unique val generation strategy
	@Column(name="Project_ID") 
	private Integer projectId;
	
	@Column(name="Project")
	private String project;
	
	@Column(name="Start_Date")
    private Date startDate;
    
    @Column(name="End_Date")
    private Date endDate;
    
    @Column(name="Priority") 
	private Integer priority;
    
    @Transient
    private Integer managerId;
    
    @Transient
    @Column(name="noOfTasks")
    private Integer noOfTasks;
    
    @Transient
    private String status;
    
	public Project(){
		
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}

	public Integer getNoOfTasks() {
		return noOfTasks;
	}

	public void setNoOfTasks(Integer noOfTasks) {
		this.noOfTasks = noOfTasks;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
