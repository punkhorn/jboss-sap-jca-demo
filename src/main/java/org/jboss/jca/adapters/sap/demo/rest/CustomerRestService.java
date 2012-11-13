package org.jboss.jca.adapters.sap.demo.rest;

import javax.inject.Inject;
import javax.resource.ResourceException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.jca.adapters.sap.demo.model.Customer;
import org.jboss.jca.adapters.sap.demo.model.CustomerList;
import org.jboss.jca.adapters.sap.demo.service.CustomerService;

@Path("/customers")
public class CustomerRestService {

	@Inject
	private CustomerService customerService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public CustomerList searchCustomers(@QueryParam("name") String name, @QueryParam("index") String index, @QueryParam("chunkSize") String chunkSize) {
		try {
			return customerService.searchCustomers(name, index, chunkSize);
		} catch (ResourceException e) {
			throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces(MediaType.APPLICATION_JSON)
	public Customer lookupCustomeryById(@PathParam("id") String id) {
		try {
			Customer customer = customerService.getCustomer(id);
			if (customer == null) {
				throw new WebApplicationException(Response.Status.NOT_FOUND);
			}
			return customer;
		} catch (ResourceException e) {
			throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
		}
	}
	
}