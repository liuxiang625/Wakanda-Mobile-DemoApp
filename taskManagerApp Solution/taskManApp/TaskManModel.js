
guidedModel =// @startlock
{
	User :
	{
		methods :
		{// @endlock
			addUser:function(signUpData)
			{// @lock
				// Sign Up
				if (loginByPassword(signUpData.logIn, signUpData.password)) {
					return {message: "Account already exists, please sign in directly."};
				} else {
					var sessionRef = currentSession(); // Get session.
					var promoteToken = sessionRef.promoteWith("Admin"); //temporarily make this session Admin level.
					var newUser =  ds.User.createEntity();  
					newUser.ID = ds.User.max("ID")  + 1;
					if (ds.User.find("logIn = :1", signUpData.logIn)) {// check if login exists
          				return{message: "User name has already be registered"};
          			}   
          			newUser.logIn = signUpData.logIn;     
          			newUser.password = signUpData.password;     
          			if (ds.User.find("fullName = :1", signUpData.fullName)) {// check if fullname exists
          				return{message: "User full name has already be registered"};
          			}
          			newUser.fullName = signUpData.fullName; 
          			newUser.phone = signUpData.phone;
          			if (ds.User.find("email = :1", signUpData.email)) { // check if email exists
          				return{message: "Email has already be registered"};
          			}
          			newUser.email = signUpData.email;
          			newUser.fax = signUpData.fax;   
          			newUser.location = signUpData.location;
          			newUser.department = signUpData.department;
          			newUser.role =(!signUpData.role) ? "User": signUpData.role;          
          			newUser.save();     // save the entity
          			sessionRef.unPromote(promoteToken); //put the session back to normal.
          			if (loginByPassword(signUpData.logIn, signUpData.password)) {
          				return {message: "Congratulations " + signUpData.fullName + "!     Please sign in with your new account"};
          			} else {
          				return {message: "I'm sorry but we could not sign you up."};
					}
				}
			}// @startlock
		}
	}
};// @endlock
