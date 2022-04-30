/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
//document.addEventListener('body', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

//    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//	alert('Platform:2 ' + cordova.platformId + '\n' + 'Version: ' + cordova.version );
//    document.getElementById('deviceready').classList.add('ready');
	
	
	
	
}


$(document).ready(function() {

  // Handler for .ready() called.
  	document.addEventListener("deviceready", onDeviceReady, true);
	createDatabase();
	$("#reset").click(function() {
      $('#tName').val('');
      $('#tDestination').val('');
      $('#tdate').val('');
      $('input[name="riskAssessment"]:checked').removeAttr('checked');
      $('#tDescription').val('');
    });
	$("#submit").click(function () {	
		
		var result=validate();
		var tName= $('#tName').val();
		var tDestination= $('#tDestination').val();
		var tdate= $('#tdate').val();
		var trisk= $('input[name="riskAssessment"]:checked').val();
		var tDescription= $('#tDescription').val();
		var string= "Name of the Trip : "+tName+"\nTrip Destination : "+tDestination+
		"\nDate of the Trip : "+tdate+
		"\nRisk Assessment : "+trisk+
		"\nDescrpition : "+tDescription;
		if(validate()){
            InsertTrip(tName,tDestination,tdate,trisk,tDescription);
            getData();
		}
		else{
		    alert("Please the fill required field");
		}
	});


});

function validate(){
		var flag=true;
		var tName= $('#tName').val();
		var tDestination= $('#tDestination').val();
		var tdate= $('#tdate').val();
		var trisk= $('input[name="riskAssessment"]:checked').val();
		//var tDescription= $('#tDescription').val();
		if(tName == ""){
			flag=false;
		}
		if(tDestination == ""){
			flag=false;
		}
		if(tdate == ""){
			flag=false;
		}
		if(trisk == ""){
			flag=false;
		}
		return flag;
	}


function createDatabase() {

	var request = window.indexedDB.open("M-Expenses",1);

	request.onupgradeneeded = function() {

		db = request.result;

		var store = db.createObjectStore("Trips", {autoIncrement: true, keyPath: "tid"});
		var TName = store.createIndex("TName", "TName", {unique: true});
		var TDestination = store.createIndex("TDestination", "TDestination");
		var TDate = store.createIndex("TDate", "TDate");
		var TRisk = store.createIndex("TRisk", "TRisk");
		var TDescription = store.createIndex("TDescription", "TDescription");
	};


	request.onsuccess = function() {

	  db = request.result;
		alert("Database created");

	};

	request.onerror = function (event) {

    	alert("Error creating database: " + request.errorCode);

	};
}

function InsertTrip(tName,tDestination,tdate,trisk,tDescription){
    var data={'TName': tName, 'TDestination': tDestination, 'TDate': tdate, TRisk:trisk ,TDescription:tDescription};

    var transaction = db.transaction("M-Expenses", "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function(event) {
        note.innerHTML += '<li>Transaction completed.</li>';
      };

      transaction.onerror = function(event) {
      note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';
      };

      // create an object store on the transaction
      var objectStore = transaction.objectStore("M-Expenses");

      // Make a request to add our newItem object to the object store
      var objectStoreRequest = objectStore.add(data);

      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        note.innerHTML += '<li>Request successful.</li>';
      };
}

function getData() {
    var transaction = db.transaction("M-Expenses", "readwrite");
    var request = transaction.getAll();
    //alert(request);
  }

