/*
 * JBoss, Home of Professional Open Source
 * Copyright 2012, Red Hat, Inc., and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
Core JavaScript functionality for the application.  Performs the required
Restful calls, validates return values, and populates the customer table.
 */

/* Get the customer template */
function getCustomerTemplate() {
    $.ajax({
        url: "tmpl/customer.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            updateCustomerTable();
        }
    });
}

/* Builds the updated table for the customer list */
function buildCustomerRows(customerList) {
    return _.template( $( "#customer-tmpl" ).html(), {"customers": customerList.customers});
}

/* Uses JAX-RS GET to retrieve current customer list */
function updateCustomerTable() {
    $.ajax({
        url: "rest/customers",
        cache: false,
        success: function(data) {
            $('#customers').empty().append(buildCustomerRows(data));
        },
        error: function(error) {
            //console.log("error updating table -" + error.status);
        }
    });
}

/*
Attempts to register a new customer using a JAX-RS POST.  The callbacks
the refresh the customer table, or process JAX-RS response codes to update
the validation errors.
 */
function registerCustomer(customerData) {
    //clear existing  msgs
    $('span.invalid').remove();
    $('span.success').remove();

    $.ajax({
        url: 'rest/customers',
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(customerData),
        success: function(data) {
            //console.log("Customer registered");

            //clear input fields
            $('#reg')[0].reset();

            //mark success on the registration form
            $('#formMsgs').append($('<span class="success">Customer Registered</span>'));

            updateCustomerTable();
        },
        error: function(error) {
            if ((error.status == 409) || (error.status == 400)) {
                //console.log("Validation error registering user!");

                var errorMsg = $.parseJSON(error.responseText);

                $.each(errorMsg, function(index, val) {
                    $('<span class="invalid">' + val + '</span>').insertAfter($('#' + index));
                });
            } else {
                //console.log("error - unknown server issue");
                $('#formMsgs').append($('<span class="invalid">Unknown server error</span>'));
            }
        }
    });
    
}

function searchCustomers(searchData) {
    //clear existing  msgs
    $('span.invalid').remove();
    $('span.success').remove();
	
    $.ajax({
    	url: 'rest/customers/search',
    	contentType: "application/json",
    	dataType: "json",
    	data: searchData,
    	success: function(data) {
            //clear input fields
            $('#reg')[0].reset();

            //mark success on the registration form
            $('#formMsgs').append($('<span class="success">Customer Registered</span>'));

            $('#customers').empty().append(buildCustomerRows(data));
    	},
    	error: function(error) {
    		$('#formMsgs').append($('<span class="invalid">' + error.responseText + '</span>'));
    	}
    });
}

