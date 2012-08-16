
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var removeCurrentEntity = {};	// @button
	var button1 = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock


// eventHandlers// @lock

	removeCurrentEntity.click = function removeCurrentEntity_click (event)// @startlock
	{// @endlock
		WAF.sources.user.removeCurrent({onSuccess: function(event) {
					//sources.user.serverRefresh();
					$("#updateTaskErrorDiv").html("User account removed");
				},
				onError: function(error) {
				$("#updateTaskErrorDiv").html(error['error'][0].message + " (" + error['error'][0].errCode + ")");
			}
		});
		
		
		String.prototype.trim = function() {
    		var x = this.toString();
    		x = x.replace(new RegExp("^\\s+", ""), "");
    		return x;
		}
	
		var test = " test ";
		var result=test.trim();
		console.log(result);

	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$$("navigationView1").goToView(2);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$$('textField1').setValue("Input");
		$$('tabView1').addTab('New ', false);
		var newTab=$$('tabView1').getSelectedTab();
		var domID = 'New_' + vType + '_' + Math.floor(Math.random()*1001);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("removeCurrentEntity", "click", removeCurrentEntity.click, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
