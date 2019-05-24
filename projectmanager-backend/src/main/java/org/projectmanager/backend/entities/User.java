package org.projectmanager.backend.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="user")
@JsonIgnoreProperties
public class User {
	
	@Id //primary key
	@GeneratedValue(strategy=GenerationType.IDENTITY) //unique val generation strategy
	@Column(name="User_ID") //col in table to match with
	private Integer userId;
	
	@Column(name="First_Name")
	private String firstName;
	
	@Column(name="Last_Name")
    private String lastName;
    
    @Column(name="Employee_ID")
    private Integer empId;
    
	public User(){
		
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getEmpId() {
		return empId;
	}

	public void setEmpId(Integer empId) {
		this.empId = empId;
	}

		
}
