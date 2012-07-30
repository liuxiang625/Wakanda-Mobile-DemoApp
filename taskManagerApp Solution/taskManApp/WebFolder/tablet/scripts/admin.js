
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var louOutButton2 = {};	// @button
	var deptSelect = {};	// @select
	var roleRadioGroup = {};	// @radioGroup
	var button2 = {};	// @button
	var button3 = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	var locationRadioGroup = {};	// @radioGroup
	var documentEvent = {};	// @document
	var button1 = {};	// @button
// @endregion// @endlock
deparmentArray = [];
locationArray = [];

function applyDataOnForm() {
	$$('locationRadioGroup').setValue(sources.user.location);
	$$('roleRadioGroup').setValue(sources.user.role);
	$$('deptSelect').setValue(sources.user.department);
};
// eventHandlers// @lock

	louOutButton2.click = function louOutButton2_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()) {
			$$("navigationView1").goToView(1);
		}
	};// @lock

	deptSelect.click = function deptSelect_click (event)// @startlock
	{// @endlock
		sources.user.department = $$('deptSelect').getValue();
	};// @lock

	roleRadioGroup.click = function roleRadioGroup_click (event)// @startlock
	{// @endlock
		sources.user.role = $$('roleRadioGroup').getValue();
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		WAF.sources.user.save({
				onSuccess: function (event) {
					sources.user.all();					
					$("#updateTaskErrorDiv").html("Task has been updated"); 
				},
				onError: function(error) {
					$("#updateTaskErrorDiv").html(error['error'][0].message);
				}	
			});
	};// @lock

	button3.click = function button3_click (event)// @startlock
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

	locationRadioGroup.click = function locationRadioGroup_click (event)// @startlock
	{// @endlock
		sources.user.location = $$('locationRadioGroup').getValue();
	};// @lock

	documentEvent.onorientationchange = function documentEvent_onorientationchange (event)// @startlock
	{// @endlock
		//$$('container1').resize(20,200);
		if($(window).width() < 980) {
			$$('container1').setRight(207);
			$$('container1').setTop(300);
			$$('dataGrid1').resize(414,840);
			$$('container2').resize(353,840);
			$$('container2').setLeft(415);
			$$("button2").setRight(5);
			$$("button3").setLeft(5);
		}
		else {
			$$('container1').setRight(341);
			$$('container1').setTop(207);
			$$('dataGrid1').resize(514,680);
			$$('container2').resize(512,679);
			$$('container2').setLeft(515);
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser() != null) {
			
			$$("navigationView1").goToView(2);
			sources.user.all({onSuccess: function(event) {
					applyDataOnForm();
				}
			});
			
		}
		deparmentArray = [{deptName: ''}, {deptName: 'Tech'}, {deptName:'Management'},{deptName:'Operation'},{deptName:'Sales'},{deptName:'Marketing'}];
		sources.deparmentArray.sync();
		locationArray = [{location: ""}, {location: "U.S."},{location: "France"}];
		sources.locationArray.sync();
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$("#errorDiv1").html("");
	if (WAF.directory.loginByPassword(WAF.sources.adminLogInObj.userName, WAF.sources.adminLogInObj.password)) {

		if (WAF.directory.currentUserBelongsTo("Admin")) {
			
			$$("navigationView1").goToView(2);
			sources.user.all();
			applyDataOnForm();
		} else {
			$("#errorDiv1").html("Only Admin has access to administration");
		}
	} else {
		$("#errorDiv1").html("Invalid login.");
	}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onorientationchange", documentEvent.onorientationchange, "WAF");
	WAF.addListener("louOutButton2", "click", louOutButton2.click, "WAF");
	WAF.addListener("deptSelect", "click", deptSelect.click, "WAF");
	WAF.addListener("roleRadioGroup", "click", roleRadioGroup.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("dataGrid1", "onRowClick", dataGrid1.onRowClick, "WAF");
	WAF.addListener("locationRadioGroup", "click", locationRadioGroup.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
