
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var taskDetailOwnerSelect = {};	// @select
	var taskStatusSelect = {};	// @select
	var taskDetailUpdateButton = {};	// @button
	var nextTaskImageButton = {};	// @buttonImage
	var button9 = {};	// @button
	var previuosTaskImageButton = {};	// @buttonImage
	var menuItem3 = {};	// @menuItem
	var menuItem2 = {};	// @menuItem
	var menuItem1 = {};	// @menuItem
	var taskFinishButton = {};	// @button
	var button3 = {};	// @button
	var button1 = {};	// @button
	var taskCreatedDataGrid = {};	// @dataGrid
	var taskDetailBackButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var textField10 = {};	// @textField
	var textField12 = {};	// @textField
	var profilePasswordConfirmField = {};	// @textField
	var button2 = {};	// @button
	var profileSaveButton = {};	// @button
	var richText9 = {};	// @richText
	var richText8 = {};	// @richText
	var button4 = {};	// @button
	var button5 = {};	// @button
	var newTaskButton = {};	// @button
	var signUpDeptSelect = {};	// @select
	var documentEvent = {};	// @document
	var signUpConfirmPwField = {};	// @textField
	var signInButton = {};	// @button
	var signUpButton = {};	// @button
	var textToSignIn = {};	// @richText
	var textToSIgnUp = {};	// @richText
	var introSignUpButton = {};	// @button
	var introSignInButton = {};	// @button
// @endregion// @endlock
 deptArray = [];
 pririotyArray = [];
 locationArray = [];
 statusArray = [];
 function validateEmail(emailToValidate) {
	var pattern= new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");// email matching regex
	return pattern.test(emailToValidate);
};
function validatePhone(phoneToValidate) {
	var strippedPhoneNumber = phoneToValidate.replace(new RegExp("[\s()+\-\.]|ext","gi"), '');// get rid of () + - . ext in number
	var pattern = new RegExp("^[0-9]{7,14}$");//match 7-14 digits
	return pattern.test(strippedPhoneNumber);
};
function taskStatusAction(taskNextStatus) {
	var taskPreviousStatus =  sources.task.status;// back status original status
		if(confirm("Are you sure to set task as " + taskStatus + " ?")) {
			$$("taskStatusSelect").setValue(taskNextStatus);
			sources.task.status = taskNextStatus;
			sources.task.save({
				onSuccess: function (event) {
					WAF.sources.actions.newEntity();
					WAF.sources.actions.actor.set(WAF.sources.user);
					WAF.sources.actions.targetTask.set(WAF.sources.task);
					WAF.sources.actions.time = new Date();
					WAF.sources.actions.name = taskNextStatus;
					WAF.sources.actions.comment = "Task " + taskNextStatus + " by: " + WAF.sources.user.fullName;
					WAF.sources.actions.save();
					WAF.sources.actions.serverRefresh();
					//WAF.sources.actions.all();
					$("#taskManageErrorDiv").html("Task has been updated");
					$$("navigationView2").goToView(4);
				},
				onError: function(error) {
					$("#taskUpdateErrorDiv").html(error['error'][0].message);
				}	
			});
		}
		else {
			$$("taskStatusSelect").setValue(taskPreviousStatus);
		}	
	
};
// eventHandlers// @lock

	taskDetailOwnerSelect.change = function taskDetailOwnerSelect_change (event)// @startlock
	{// @endlock
		//taskDetailOwnerSelect
		var taskPreviousOwner = sources.task.owner.fullName;
		var taskNextOwner = $$("taskDetailOwnerSelect").sourceAtt.getValue();
		if(confirm("Are you sure to set task owner to " + taskNextOwner + " ?")) {
			sources.user1.query("fullName = :1",taskNextOwner);
			sources.task.owner.set(sources.user1);
		}
		else {
			$$("taskDetailOwnerSelect").setValue(taskPreviousOwner);
		}
	};// @lock

	taskStatusSelect.change = function taskStatusSelect_change (event)// @startlock
	{// @endlock
		var taskPreviousStatus = sources.task.status;// back status original status
		var taskStatus = $$("taskStatusSelect").sourceAtt.getValue(); // get selected value
		if(confirm("Are you sure to set task as " + taskStatus + " ?")) {
			sources.task.status = taskStatus;
		}
		else {
			$$("taskStatusSelect").setValue(taskPreviousStatus);
		}	
	};// @lock

	taskDetailUpdateButton.click = function taskDetailUpdateButton_click (event)// @startlock
	{// @endlock
		sources.task.save({
			onSuccess: function (event) {
				WAF.sources.actions.newEntity();
				WAF.sources.actions.actor.set(WAF.sources.user);
				WAF.sources.actions.targetTask.set(WAF.sources.task);
				WAF.sources.actions.time = new Date();
				WAF.sources.actions.name = "Updated";
				WAF.sources.actions.comment = "Task updated by: " + WAF.sources.user.fullName;
				WAF.sources.actions.save();
				WAF.sources.actions.serverRefresh();
				//WAF.sources.actions.all();
				$("#taskManageErrorDiv").html("Task has been updated");
				$$("navigationView2").goToView(4);
			},
			onError: function(error) {
				$("#taskUpdateErrorDiv").html(error['error'][0].message);
			}	
		});
	};// @lock

	nextTaskImageButton.click = function nextTaskImageButton_click (event)// @startlock
	{// @endlock
		sources.task.selectNext();
	};// @lock

	button9.click = function button9_click (event)// @startlock
	{// @endlock
		WAF.sources.actions.newEntity();
		WAF.sources.actions.actor.set(WAF.sources.user);
		WAF.sources.actions.targetTask.set(WAF.sources.task);
		WAF.sources.actions.time = new Date();
		WAF.sources.actions.name = "Updated";
		WAF.sources.actions.comment = WAF.sources.user.fullName + " Says: " + $$("actionCommentPostField").getValue();
		WAF.sources.actions.save();
		WAF.sources.actions.serverRefresh();
		//WAF.sources.actions.all();
		$$("actionCommentPostField").setValue("")
	};// @lock

	previuosTaskImageButton.click = function previuosTaskImageButton_click (event)// @startlock
	{// @endlock
		sources.task.selectPrevious();
	};// @lock

	menuItem3.click = function menuItem3_click (event)// @startlock
	{// @endlock
		$$("taskCreatedQeryField").setValue("status: All");
		sources.task.query("");
	};// @lock

	menuItem2.click = function menuItem2_click (event)// @startlock
	{// @endlock
		$$("taskCreatedQeryField").setValue("from: " + WAF.directory.currentUser().fullName + " status: Open | Active");
		sources.task.query("manager.fullName = :1 and status = :2 or status = :3",{params:[WAF.directory.currentUser().fullName,"Open","Active"]});
	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		$$("taskCreatedQeryField").setValue("to: " + WAF.directory.currentUser().fullName + " status: Open | Active");
		sources.task.query("owner.fullName = :1 and status != :2 and status != :3",{params:[WAF.directory.currentUser().fullName,"Deleted","Canceled"]});
	};// @lock

	taskFinishButton.click = function taskFinishButton_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(4);
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(4);
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(4);
	};// @lock

	taskCreatedDataGrid.onRowClick = function taskCreatedDataGrid_onRowClick (event)// @startlock
	{// @endlock
		//WAF.sources.task.selectByKey(sources.taskCreated.getAttributeValue("ID"),{
		//	onSuccess: function(event) {
				$$("taskDetailOwnerSelect").setValue(sources.owner.getAttributeValue("fullName"));
				$$("taskStatusSelect").setValue(sources.task.getAttributeValue("status"));  
				$$("navigationView2").goToView(7);			//}
		//});
	};// @lock

	taskDetailBackButton.click = function taskDetailBackButton_click (event)// @startlock
	{// @endlock
		sources.task.all({
			onSuccess: function(event) {
				$$("navigationView2").goToView(4);
				//$("#taskManageErrorDiv").html("Task update canceled");
			},
			onError: function(error) {
				$("#taskUpdateErrorDiv").html(error['error'][0].message);
			}
		}); 
	};// @lock

	dataGrid2.onRowClick = function dataGrid2_onRowClick (event)// @startlock
	{// @endlock
		
		//WAF.sources.task.selectByKey(sources.taskOwned.getAttributeValue("ID"),{
		//	onSuccess: function(event) {
				$$("taskDetailOwnerSelect").setValue(sources.owner.getAttributeValue("fullName"));
				$$("taskStatusSelect").setValue(sources.task.getAttributeValue("status"));     
				$$("navigationView2").goToView(7);			//}
		//});
	};// @lock

	textField10.blur = function textField10_blur (event)// @startlock
	{// @endlock
		if(!validatePhone( $$("textField10").getValue())) {
			$("#phoneFaxValidationErrorDiv").html("Please input a valid phone or fax");
			$("#profileSaveButton").attr("disabled", true);
		}
		else {
			$("#phoneFaxValidationErrorDiv").html("");
			$("#profileSaveButton").attr("disabled", false);
		}
	};// @lock

	textField12.blur = function textField12_blur (event)// @startlock
	{// @endlock
		var emailToValidate = $$("textField12").getValue();
		if(!validateEmail(emailToValidate)) {
			$("#emailValidationErrorDiv").html("Please input a valid e-mail address");
			$("#profileSaveButton").attr("disabled", true);
		}
		else {
			$("#emailValidationErrorDiv").html("");
			$("#profileSaveButton").attr("disabled", false);
		}
	};// @lock

	profilePasswordConfirmField.blur = function profilePasswordConfirmField_blur (event)// @startlock
	{// @endlock
		
		if ($$("profilePasswordField").getValue() != $$("profilePasswordConfirmField").getValue()) {
			$("#matchPasswordError").html("Passwords do not match.");
			$("#profileSaveButton").attr("disabled", true);
		}
		else {
			$("#matchPasswordError").html("");
			$("#profileSaveButton").attr("disabled", false);
		}
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(4);
	};// @lock

	profileSaveButton.click = function profileSaveButton_click (event)// @startlock
	{// @endlock
		if ($$("profilePasswordField").getValue() === $$("profilePasswordConfirmField").getValue()) {
			sources.user.save({
			onSuccess: function(event) {
				$("#profileUpdateErrorDiv").html("User Profile updated.");
				//WAF.sources.user.serverRefresh();
				$("#userProfileUpdateButton").attr("disabled", true);
			}, 
			onError: function(error) {
				$("#profileUpdateErrorDiv").html(error['error'][0].message);
			}
		}); 
		} else {
			$("#profileUpdateErrorDiv").html("The Passwords input twice do not match.");
		}
	};// @lock

	richText9.click = function richText9_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(6);
		$$("profilePasswordConfirmField").setValue(sources.user.password);
		$$("profileLocationtSelcet").setValue(sources.user.department);// work around: setr select of current user location 
		$$("profileDeparmentSelcet").setValue(sources.user.department);//work around: setr select of current user department
	};// @lock

	richText8.click = function richText8_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()) {
			$$("navigationView2").goToView(1);
		}
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock

		sources.task.priority = $$("newTaskPrioritySelect").sourceAtt.getValue();
		//WAF.sources.user.query("ID = :1", $$("newTaskUserSelect").sourceAtt.getValue());//find owner from select and query in user datasource
		WAF.sources.task.owner.set(WAF.sources.user1);
		//WAF.sources.user.query("fullName = :1", WAF.directory.currentUser().fullName);// restore user datasource to current user
		WAF.sources.task.manager.set(WAF.sources.user);

		if (WAF.sources.task.owner)
		WAF.sources.task.status = "Active";
		WAF.sources.task.save({
			onSuccess: function(event) {
				//sources.task.addEntity(sources.taskCreated.getCurrentElement());
				sources.user.all(); 
				$$("navigationView2").goToView(4);
				$("#taskManageErrorDiv").html("New Task Saved.");
				WAF.sources.actions.newEntity();
				WAF.sources.actions.actor.set(WAF.sources.user);
				WAF.sources.actions.targetTask.set(WAF.sources.task);
				WAF.sources.actions.time = new Date();
				WAF.sources.actions.name = "Created";
				WAF.sources.actions.comment = "Task is created by: " + WAF.sources.user.fullName;
				WAF.sources.actions.save();
				WAF.sources.task.serverRefresh();
			},
			onError: function(error) {
				$("#taskManageErrorDiv").html(error['error'][0].message);
			}
		}); 
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		sources.task.all({
			onSuccess: function(event) {
				$$("navigationView2").goToView(4);
				$("#taskManageErrorDiv").html("Task creation canceled");
			},
			onError: function(error) {
				$("#taskCreationErrorDiv").html(error['error'][0].message);
			}
		}); 
	};// @lock

	newTaskButton.click = function newTaskButton_click (event)// @startlock
	{// @endlock
		WAF.sources.task.newEntity();
		WAF.sources.task.title = "Please give task a title.";
		WAF.sources.task.description = "Please describe the task.";
		WAF.sources.task.startDate = new Date();
		WAF.sources.task.dueDate = new Date();
		WAF.sources.task.status = "Open";
		$$("navigationView2").goToView(5);
	};// @lock

	signUpDeptSelect.change = function signUpDeptSelect_change (event)// @startlock
	{// @endlock
		 WAF.sources.signUpObject.department = $$("signUpDeptSelect").getValue()
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//determine if their is a current user session
		if (WAF.directory.currentUser() != null) {
			$$("navigationView2").goToView(4);
			$("#signInIndicatorDiv").html( WAF.directory.currentUser().fullName);
		}
		
		statusArray = [{status: "Open"},{status:"Active"},{status: "Completed"},{status:"Canceled"},{status: "Deleted"}];
		sources.statusArray.sync();
		locationArray = [{location: ""}, {location: "U.S."},{location: "France"}];
		sources.locationArray.sync();
		pririotyArray = [{priority: 'Low'},{priority: 'Mid'},{priority: 'High'},{priority: 'Emergency'}];
		sources.pririotyArray.sync();
		deptArray = [{deptName: ''}, {deptName: 'Tech'}, {deptName:'Management'},{deptName:'Operation'},{deptName:'Sales'},{deptName:'Marketing'}];
		sources.deptArray.sync();
	};// @lock

	signUpConfirmPwField.blur = function signUpConfirmPwField_blur (event)// @startlock
	{// @endlock
		if($$("signUpPasswordField").getValue() != $$("signUpConfirmPwField").getValue()) {
			$("#passwordConfirmErrorDiv").html("Password input twice does not match");	
		}
		else {
			$("#passwordConfirmErrorDiv").html("");	

		}
	};// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		$("#loginErrorDiv").html("");
		var loginName = $$("signInLogInField").getValue();
		var thePassword = $$("signInPasswordField").getValue();
		if (WAF.directory.loginByPassword(loginName, thePassword)) {
			$$("navigationView2").goToView(4);
			$("#signInIndicatorDiv").html( WAF.directory.currentUser().fullName);
			$$("signInLogInField").setValue("");
			$$("signInPasswordField").setValue("");	
			sources.user.query("fullName = :1", WAF.directory.currentUser().fullName);// set user to current		
		} else {
			//should limit times of invalid sign 
			$("#loginErrorDiv").html("Invalid login.");
		}
	};// @lock

	signUpButton.click = function signUpButton_click (event)// @startlock
	{// @endlock
		// Sign Up
			var signUpData = {
			logIn: WAF.sources.signUpObject.logIn,
			password: WAF.sources.signUpObject.password,
			fullName: WAF.sources.signUpObject.fullName,
			department: WAF.sources.signUpObject.department,
			phone: WAF.sources.signUpObject.phone,
			fax: WAF.sources.signUpObject.fax,
			email: WAF.sources.signUpObject.email,
			location: WAF.sources.signUpObject.location,
			role: WAF.sources.signUpObject.role
							
		};
		if(!signUpData.logIn  | !signUpData.password | !signUpData.fullName | !$$("signUpConfirmPwField").getValue() ) {
			$("#signUperrDiv").html("Please fill all the required fileds");
		}
		else {
			WAF.ds.User.addUser({
				onSuccess: function(event) {
					$("#loginErrorDiv").html(event.result.message);
					$("#signUperrDiv").html(event.result.message);
					if (WAF.directory.currentUser() !== null) {
						$$("navigationView2").goToView(2);
						$$("signInLogInField").setValue("");
						$$("signInPasswordField").setValue("");	
					}
				
				},
				onError: function(error) {
					$("#signUperrDiv").html(error['error'][0].message);
				}
			}, signUpData);
		
			signUpObject.login = "";
			signUpObject.password = "";
			signUpObject.fullName = "";
			WAF.sources.signUpObject.autoDispatch();
		}
	};// @lock

	textToSignIn.click = function textToSignIn_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(2);
	};// @lock

	textToSIgnUp.click = function textToSIgnUp_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(3);
	};// @lock

	introSignUpButton.click = function introSignUpButton_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(3);
	};// @lock

	introSignInButton.click = function introSignInButton_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(2);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("taskDetailOwnerSelect", "change", taskDetailOwnerSelect.change, "WAF");
	WAF.addListener("taskStatusSelect", "change", taskStatusSelect.change, "WAF");
	WAF.addListener("taskDetailUpdateButton", "click", taskDetailUpdateButton.click, "WAF");
	WAF.addListener("nextTaskImageButton", "click", nextTaskImageButton.click, "WAF");
	WAF.addListener("button9", "click", button9.click, "WAF");
	WAF.addListener("previuosTaskImageButton", "click", previuosTaskImageButton.click, "WAF");
	WAF.addListener("menuItem3", "click", menuItem3.click, "WAF");
	WAF.addListener("menuItem2", "click", menuItem2.click, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
	WAF.addListener("taskFinishButton", "click", taskFinishButton.click, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("taskCreatedDataGrid", "onRowClick", taskCreatedDataGrid.onRowClick, "WAF");
	WAF.addListener("taskDetailBackButton", "click", taskDetailBackButton.click, "WAF");
	WAF.addListener("dataGrid2", "onRowClick", dataGrid2.onRowClick, "WAF");
	WAF.addListener("textField10", "blur", textField10.blur, "WAF");
	WAF.addListener("textField12", "blur", textField12.blur, "WAF");
	WAF.addListener("profilePasswordConfirmField", "blur", profilePasswordConfirmField.blur, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("profileSaveButton", "click", profileSaveButton.click, "WAF");
	WAF.addListener("richText9", "click", richText9.click, "WAF");
	WAF.addListener("richText8", "click", richText8.click, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
	WAF.addListener("button5", "click", button5.click, "WAF");
	WAF.addListener("newTaskButton", "click", newTaskButton.click, "WAF");
	WAF.addListener("signUpDeptSelect", "change", signUpDeptSelect.change, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("signUpConfirmPwField", "blur", signUpConfirmPwField.blur, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("signUpButton", "click", signUpButton.click, "WAF");
	WAF.addListener("textToSignIn", "click", textToSignIn.click, "WAF");
	WAF.addListener("textToSIgnUp", "click", textToSIgnUp.click, "WAF");
	WAF.addListener("introSignUpButton", "click", introSignUpButton.click, "WAF");
	WAF.addListener("introSignInButton", "click", introSignInButton.click, "WAF");
// @endregion
};// @endlock
