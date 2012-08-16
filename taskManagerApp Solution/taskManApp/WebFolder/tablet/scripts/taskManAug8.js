
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var signUpButton = {};	// @button
	var signInButton = {};	// @button
	var richText4 = {};	// @richText
	var richText2 = {};	// @richText
// @endregion// @endlock
 deptArray = [];
// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		deptArray = [ {deptName: 'Tech'}, {deptName:'Management'},{deptName:'Operation'},{deptName:'Sales'},{deptName:'Marketing'}];
		sources.deptArray.sync();
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
		if(!signUpData.logIn  | !signUpData.password | !signUpData.fullName | !signUpData.email |!$$("signUpConfirmPwField").getValue() ) {
			$("#signUperrDiv").html("Please fill all the required fileds");
		}
		else if (!validatePhone( $$("signUpPhoneNumField").getValue()) | !validatePhone( $$("signUpFaxNumField").getValue()) | !validateEmail($$("signUpEmailNumField").getValue())) {
			$("#signUperrDiv").html("Please input Phone/Fax/Email values");
		}
		else {
			WAF.ds.User.addUser({
				onSuccess: function(event) {
					$("#loginErrorDiv").html(event.result.message);
					$("#signUperrDiv").html(event.result.message);
					if (WAF.directory.currentUser() !== null) {
						//WAF.sources.user.all();
						$$("navigationView1").goToView(1);
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

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		$("#loginErrorDiv").html("");
		var loginName = $$("signInLogInField").getValue();
		var thePassword = $$("signInPasswordField").getValue();
		if (WAF.directory.loginByPassword(loginName, thePassword)) {
			$$("navigationView1").goToView(4);
			//$$("tabView1").selectTab(1); 
			//$("#signInIndicatorDiv").html( WAF.directory.currentUser().fullName);
			$$("signInLogInField").setValue("");
			$$("signInPasswordField").setValue("");	
			//sources.user.query("fullName = :1", WAF.directory.currentUser().fullName);// set user to current
			//sources.task.query("");		
		} else {
			//should limit times of invalid sign 
			$("#loginErrorDiv").html("Invalid login.");
		}
	};// @lock

	richText4.click = function richText4_click (event)// @startlock
	{// @endlock
		$$("navigationView1").goToView(1);
	};// @lock

	richText2.click = function richText2_click (event)// @startlock
	{// @endlock
		$$("navigationView1").goToView(2);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("signUpButton", "click", signUpButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("richText4", "click", richText4.click, "WAF");
	WAF.addListener("richText2", "click", richText2.click, "WAF");
// @endregion
};// @endlock
