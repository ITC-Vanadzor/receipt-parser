  app.controller('usageController', function($scope) {
	       
	    //array for saving 3 versions  of show progress
	    $scope.progressArray = [{
	        progress: 33,
	        buttonStep: "buttonStep[0]",
	        showDiv: 0,
	        Step: "1"
	    }, {
	        progress: 66,
	        buttonStep: "buttonStep[1]",
	        showDiv: 1,
	        Step: " 2"
	    }, {
	        progress: 100,
	        buttonStep: "buttonStep[2]",
	        showDiv: 2,
	        Step: "3"
	    }];
	    //array for saving 3 versions of show divs
	    $scope.showArray = [{
	        div: "div[0]",
	        text: "It is that text, which will tell us about the  first step to do for using our fascinating application:))))",
	        src: "../res/1step.png"
	    }, {
	        div: "div[1]",
	        text: "It is that text, which will tell us about the  second step to do for using our fascinating application:))))",
	        src: "../res/2step.png"
	    }, {
	        div: "div[2]",
	        text: "It is that text, which will tell us about the  third step to do for using our fascinating application:))))",
	        src: "../res/3step.png"
	    }, ];

	    // function, which dynamicly  show steps	
	    $scope.showDiv = function(num) {
	    	var progwidth=['33%','66%','100%'];
	    
	       $scope.progWidth={"width":progwidth[num]};
	        var blueButton = {
	        	 "background-color": "#0094F7",
	            // "background": "linear-gradient(to top, #0094F7, #007acc)"
	        };
	       
	        var hideDiv = false;
	        // at first hides all divs,colors steps blue,progress gray
	        $scope.div = [hideDiv, hideDiv, hideDiv];
	        $scope.buttonStep = [blueButton, blueButton, blueButton];
	       
	        // changes the  color of step gray and shows div		
	        $scope.div[num] = true;
	        $scope.buttonStep[num] = {
	            "background": "#999999"
	        };
	       
	     

	    }

	    $scope.showDiv(0);
	});

	app.controller('signInController', function($scope) {

        $scope.showHints = true;
	    //array for create acclount inputs
	    $scope.createArray = [{
	        name: "name",
	        include: "./htm/nameValid.htm",
	        place: "Username",
	        max: 10,
	        min: 3,
	        text: " This will be your username.",
	        type: "text",
	         rederror: " Your username  must be required  between 3 and 10 characters long.",
	         pattern: "",
	         message: "userForm.name.$error"
	    }, {
	        name: "email",
	        min: 5,
	        max: 30,
	        include: "./htm/emailValid.htm",
	        place: "Email",
	        text: " You will occasionally receive  account related email.",
	        type: "email",
	        rederror: " Your email must be  look like an e-mail address.",
	        pattern: "/^.+@.+\..+$/",
	        message: "userForm.email.$error"
	    }, {
	        name: "password",
	        place: "Password",
	        min: 6,
	        max: 15,
	        include: "./htm/passValid.htm",
	        text: " Use at least  six characters",
	        type: "password",
	        rederror: " Your password  must be more than 6 characters long.",
	        pattern: "",
	        message: "userForm.password.$error"
	    }, ];

	    $scope.signInArray=[$scope.createArray[1],$scope.createArray[2],];

	    //array for input profile datas
	   $scope.profileInputArray = [{
	        name: "password",
	        text: "Old Password"
	    }, {
	        name: "newpass",
	        text: "New Password"
	    }, {
	        name: "repass",
	        text: "Repeat Password"
	    }];
	});
