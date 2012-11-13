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
        }
    });
}

/* Builds the updated table for the customer list */
function buildCustomerRows(customerList) {
    return _.template( $( "#customer-tmpl" ).html(), {"customers": customerList.customers, "total": customerList.total, "limit": customerList.chunkSize, "index": customerList.index, "name": customerList.name, "email": customerList.email});
}

function searchCustomers(searchData) {
    //clear existing  msgs
    $('span.invalid').remove();
    $('span.success').remove();
	
    $.ajax({
    	url: 'rest/customers',
    	contentType: "application/json",
    	dataType: "json",
    	data: searchData,
    	success: function(data) {
            //clear input fields
            $('#reg')[0].reset();

            //mark success on the registration form
           //mark success on the registration form
            if (data.total == 0) {
            	$('#formMsgs').append($('<span class="success">Search returned no results</span>'));
            } else if (data.total == 1) {
            	$('#formMsgs').append($('<span class="success">Search returned ' + data.total + ' result</span>'));
            } else {
            	$('#formMsgs').append($('<span class="success">Search returned ' + data.total + ' results</span>'));
            }

            $('#customers').empty().append(buildCustomerRows(data));
    	},
    	error: function(error) {
    		$('#formMsgs').append($('<span class="invalid">' + error.responseText + '</span>'));
    	}
    });
}

