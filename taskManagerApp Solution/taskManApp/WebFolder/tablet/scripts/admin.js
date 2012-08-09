
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var deleteUserButton = {};	// @button
	var newUserButton = {};	// @button
	var louOutButton2 = {};	// @button
	var deptSelect = {};	// @select
	var roleRadioGroup = {};	// @radioGroup
	var saveUserButton = {};	// @button
	var resetUserButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	var documentEvent = {};	// @document
// @endregion// @endlock
deparmentArray = [];
locationArray = [];

function applyDataOnForm() {
	$$('locationRadioGroup').setValue(sources.user.location);
	$$('roleRadioGroup').setValue(sources.user.role);
	$$('deptSelect').setValue(sources.user.department);
};
function renderForOrientationChange() {
	if($(window).width() < 980) {
			$$('container1').setRight(207);
			$$('container1').setTop(300);
			$$('dataGrid1').resize(414,840);
			$$('container2').resize(353,840);
			$$('container2').setLeft(415);
			$$('navigationView1').resize(768,930);
			$$("resetUserButton").setLeft(515);	
			$$("saveUserButton").setLeft(625);	
		}
		else {
			$$('container1').setRight(341);
			$$('container1').setTop(207);
			$$('dataGrid1').resize(514,614);
			$$('container2').resize(512,679);
			$$('container2').setLeft(515);
			$$('navigationView1').resize(1024,675);
		}	
};

function footerButtonsToggleView() {
	$("#newUserButton").toggle();
	$("#deleteUserButton").toggle();	
	$("#resetUserButton").toggle();	
	$("#saveUserButton").toggle();		
}

function validateEmail(emailToValidate) {
	var pattern= new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");// email matching regex
	return pattern.test(emailToValidate);
};
function validatePhone(phoneToValidate) {
	var strippedPhoneNumber = phoneToValidate.replace(new RegExp("[\s()+\-\.]|ext","gi"), '');// get rid of () + - . ext in number
	var pattern = new RegExp("^[0-9]{7,14}$");//match 7-14 digits
	return pattern.test(strippedPhoneNumber);
};
// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$("#errorDiv1").html("");
		if (WAF.directory.loginByPassword(WAF.sources.adminLogInObj.userName, WAF.sources.adminLogInObj.password)) {
			if (WAF.directory.currentUserBelongsTo("Admin")) {
				$$("navigationView1").goToView(2);
				sources.user.all();
				applyDataOnForm();
				footerButtonsToggleView();
			} else {
				$("#errorDiv1").html("Only Admin has access to administration");
			}
		} else {
			$("#errorDiv1").html("Invalid login.");
		}
	};// @lock

	deleteUserButton.click = function deleteUserButton_click (event)// @startlock
	{// @endlock
		WAF.sources.user.removeCurrent({onSuccess: function(event) {
					//sources.user.serverRefresh();
					$("#updateTaskErrorDiv").html("User account removed");
				},
				onError: function(error) {
				$("#updateTaskErrorDiv").html(error['error'][0].message + " (" + error['error'][0].errCode + ")");
			}
		});
	};// @lock

	newUserButton.click = function newUserButton_click (event)// @startlock
	{// @endlock
		WAF.sources.user.newEntity();
		sources.user.save({onSuccess:function(event) //  save the current entity in asynchronous mode
        {
            sources.user.addEntity(sources.user.getCurrentElement());
            applyDataOnForm()
            $$('textField4').focus();
        } });
	};// @lock

	louOutButton2.touchend = function louOutButton2_touchend (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()) {
			$$("navigationView1").goToView(1);
			footerButtonsToggleView();
		}
		alert("touched!");
	};// @lock

	louOutButton2.click = function louOutButton2_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()) {
			$$("navigationView1").goToView(1);
			footerButtonsToggleView();
		}
		alert("clicked!");
	};// @lock

	deptSelect.change = function deptSelect_change (event)// @startlock
	{// @endlock
		sources.user.department = $$('deptSelect').getValue();
	};// @lock

	roleRadioGroup.change = function roleRadioGroup_change (event)// @startlock
	{// @endlock
		sources.user.role = $$('roleRadioGroup').getValue();
	};// @lock

	saveUserButton.click = function saveUserButton_click (event)// @startlock
	{// @endlock
		if (validateEmail($$('textField9').getValue()) & validatePhone ($$('textField10').getValue()) ) {
			WAF.sources.user.save({
				onSuccess: function (event) {
					//var currentEntitysBackup  = $$("dataGrid1").getSelectedRows();
					sources.user.all();				
					$("#updateTaskErrorDiv").html("Task has been updated"); 
				},
				onError: function(error) {
					$("#updateTaskErrorDiv").html(error['error'][0].message);
				}	
			});
		} else {
			$("#updateTaskErrorDiv").html("Invalid Phone number/ Email address");
		}
	};// @lock

	resetUserButton.click = function resetUserButton_click (event)// @startlock
	{// @endlock
		sources.user.all({onSuccess: function(event) {
					applyDataOnForm();
				}
			});
	};// @lock

	dataGrid1.onRowClick = function dataGrid1_onRowClick (event)// @startlock
	{// @endlock
		applyDataOnForm();
	};// @lock

	documentEvent.onorientationchange = function documentEvent_onorientationchange (event)// @startlock
	{// @endlock
		renderForOrientationChange();

	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		renderForOrientationChange();
		if (WAF.directory.currentUser() != null) {
			$$("navigationView1").goToView(2);
			sources.user.all({onSuccess: function(event) {
					applyDataOnForm();
					footerButtonsToggleView();
				}
			});			
		}
		deparmentArray = [{deptName: ''}, {deptName: 'Tech Team'}, {deptName:'Management'},{deptName:'Operation'},{deptName:'Sales'},{deptName:'Marketing'}];
		sources.deparmentArray.sync();
		locationArray = [ {location: "U.S."},{location: "France"}];
		sources.locationArray.sync();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("louOutButton2", "touchend", louOutButton2.touchend, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("roleRadioGroup", "change", roleRadioGroup.change, "WAF");
	WAF.addListener("deleteUserButton", "click", deleteUserButton.click, "WAF");
	WAF.addListener("newUserButton", "click", newUserButton.click, "WAF");
	WAF.addListener("deptSelect", "change", deptSelect.change, "WAF");
	WAF.addListener("document", "onorientationchange", documentEvent.onorientationchange, "WAF");
	WAF.addListener("louOutButton2", "click", louOutButton2.click, "WAF");
	WAF.addListener("saveUserButton", "click", saveUserButton.click, "WAF");
	WAF.addListener("resetUserButton", "click", resetUserButton.click, "WAF");
	WAF.addListener("dataGrid1", "onRowClick", dataGrid1.onRowClick, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
