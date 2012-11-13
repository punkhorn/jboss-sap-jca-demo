package org.jboss.jca.adapters.sap.demo.model;

import java.io.Serializable;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.Email;

@XmlRootElement
public class Customer implements Serializable {
	private static final long serialVersionUID = 1173370389245473146L;
	
	@NotNull
	@Size(min = 1, max = 8, message = "1-8  characters")
	@Digits(fraction = 0, integer = 8, message = "Only numeric characters")
	private String id;
	
	@NotNull
	@Size(min = 1, max = 15, message = "1-15 characters")
	private String title;
	
	@NotNull
	@Size(min = 1, max = 25, message = "1-25 characters")
	private String name;
	
	@NotNull
	@Size(min = 1, max = 30, message = "1-30 characters")
	private String street;
	
	@Size(max = 10, message = "10 characters max")
	private String poBox;
	
	@NotNull
	@Size(min = 1, max = 25, message = "1-25 characters")
	private String city;
	
	@Size(max = 3, message = "3 characters max")
	private String region;
	
	@NotNull
	@Size(min = 1, max = 10, message = "1-10 characters")
	private String postalCode;
	
	@NotNull
	@Size(min = 1, max = 3, message = "1-3 characters")
	private String country;
	
	@NotNull
	@Size(min = 1, max = 2, message = "1-2 characters")
	private String countryCode;
	
	@NotNull
	@Size(min = 1, max = 30, message = "1-30 characters")
	private String phoneNumber;
	
	@NotNull
	@Size(min = 1, max = 40, message = "1-40 characters")
	@Email
	private String email;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getPoBox() {
		return poBox;
	}

	public void setPoBox(String poBox) {
		this.poBox = poBox;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
