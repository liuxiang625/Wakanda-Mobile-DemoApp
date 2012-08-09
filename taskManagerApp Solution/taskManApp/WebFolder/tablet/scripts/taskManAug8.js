
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var signInButton = {};	// @button
	var richText4 = {};	// @richText
	var richText2 = {};	// @richText
// @endregion// @endlock

// eventHandlers// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		$("#loginErrorDiv").html("");
		var loginName = $$("signInLogInField").getValue();
		var thePassword = $$("signInPasswordField").getValue();
		if (WAF.directory.loginByPassword(loginName, thePassword)) {
			$$("navigationView2").goToView(4);
			$$("tabView1").selectTab(1); 
			$("#signInIndicatorDiv").html( WAF.directory.currentUser().fullName);
			$$("signInLogInField").setValue("");
			$$("signInPasswordField").setValue("");	
			sources.user.query("fullName = :1", WAF.directory.currentUser().fullName);// set user to current
			
			// set default query of the task inbox view
			//$$("taskCreatedQeryField").setValue("to: " + WAF.directory.currentUser().fullName + " status: Open | Active");
			sources.task.query("");		
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
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("richText4", "click", richText4.click, "WAF");
	WAF.addListener("richText2", "click", richText2.click, "WAF");
// @endregion
};// @endlock
