   function setCookie(cname, cvalue, days) {
       if (cvalue) {
            if(days){
                 var d = new Date();
                 d.setTime(d.getTime() + (days*24*60*60*1000));
                 var expires = "expires="+ d.toUTCString();
                 document.cookie = cname + "=" + cvalue + "; path=/;"+expires;                 

            }
            else{
                 document.cookie = cname + "=" + cvalue + "; path=/;";
            }
       } else {
           document.cookie = cname + "=; path=/;"
       }

   }

      function getCookie(cname) {
       var name = cname + "=";
       var ca = document.cookie.split(';');
       for (var i = 0; i < ca.length; i++) {
           var c = ca[i];
           while (c.charAt(0) == ' ') {
               c = c.substring(1);
           }
           if (c.indexOf(name) == 0) {
               return c.substring(name.length, c.length);
           }
       }
       return "";
   }

   app.controller('usageController', function($scope) {

       //array for saving 3 versions  of show progress
       $scope.progressArray = [{
           showDiv: 0,
           Step: "1"
       }, {

           showDiv: 1,
           Step: " 2"
       }, {


           showDiv: 2,
           Step: "3"
       }];

       //array for saving 3 versions of show divs
       $scope.showArray = [{
           div: "div[0]",
           text: "It is that text, which will tell us about the  first step to do for using our fascinating application:))))",
           src: "view/res/1step.png"
       }, {
           div: "div[1]",
           text: "It is that text, which will tell us about the  second step to do for using our fascinating application:))))",
           src: "view/res/2step.png"
       }, {
           div: "div[2]",
           text: "It is that text, which will tell us about the  third step to do for using our fascinating application:))))",
           src: "view/res/3step.png"
       }, ];

       // function, which dynamicly  show steps 
       $scope.showDiv = function(num) {
           $scope.isActive = [false, false, false]
           $scope.isActive[num] = true;


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

   app.controller('signInController', function($scope, $http) {
       setCookie('HDMtoken', null);
       localStorage.setItem('avatar', '');
       $scope.user = {}

       $scope.changePassword = function() {
           $scope.user.token=location.hash.slice(8,location.hash.length);
           
           $http({
                   method: 'POST',
                   url: '/resetpassword/',
                   data: $.param($scope.user),
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               })
               .success(function(data, status, headers) {
                   location.href = "/login/#/signin";
            });



       }

       $scope.submitForm = function() {
           $http({
                   method: 'POST',
                   url: '/login/statistic/',
                   data: $.param($scope.user),
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               })
               .success(function(data, status, headers) {
                   if (headers('token')) {
                    if($scope.rememberChecked){
                       setCookie('HDMtoken', headers('token'),10);                          
                      }
                      else{
                       setCookie('HDMtoken', headers('token'));                        
                      }
                       location.href = "/statistic";
                   } else {
                       $scope.signinError = true;
                   }
               });
       };


       $scope.submitReg = function() {
           $http({
                   method: 'POST',
                   url: '/registration/statistic/',
                   data: $.param($scope.user),
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               })
               .success(function(data, status, headers) {
                   if (headers('token')) {
                       setCookie('HDMtoken', headers('token'));
                       location.href = "/statistic";
                   } else {
                       $scope.signinError = true;
                   }
               });
       };


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
           message: "userForm.name.$error",
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
           message: "userForm.email.$error",
       }, {
           name: "password",
           place: "Password",
           min: 6,
           max: 15,
           include: "./htm/passValid.htm",
           text: " Use at least six characters",
           type: "password",
           rederror: " Your password must be more than 6 characters long.",
           pattern: "",
           message: "userForm.password.$error",
       }, {
           name: "newPassword",
           place: "New Password",
           min: 6,
           max: 15,
           include: "./htm/passValid.htm",
           text: " Use at least six characters",
           type: "password",
           rederror: " Your password must be more than 6 characters long.",
           pattern: "",
           message: "userForm.password.$error",
       }, {
           name: "repetNewPassword",
           place: "Repeat New Password",
           min: 6,
           max: 15,
           include: "./htm/passValid.htm",
           text: " Use at least six characters",
           type: "password",
           rederror: " Your password must be more than 6 characters long.",
           pattern: "",
           message: "userForm.password.$error",
       }];

       $scope.signUpArray = [$scope.createArray[0],$scope.createArray[1], $scope.createArray[2] ];
       $scope.signInArray = [$scope.createArray[1], $scope.createArray[2] ];
       $scope.changePassArray = [$scope.createArray[3], $scope.createArray[4] ];
   });




   app.controller('profileCtl', function($scope, $http) {

       $scope.user = {};
       $scope.pass = {};


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

       $scope.profileArray = [{
           name: "Name"
       }, {
           name: "Surname"
       }, {
           name: "Birthday"
       }];

       $scope.getUserData = function() {
           $http({
                   method: 'GET',
                   url: '/getuserdata/',
                   data: '',
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               })
               .success(function(data, status, headers) {
                   $scope.user.Name = data.name;
                   $scope.user.Surname = data.surname;
                   $scope.user.Birthday = data.birthday;
                   document.getElementById('pict').src = '/view/res/' + data.photo;
                   localStorage.setItem('avatar', '/view/res/' + data.photo);
               });
       }


       $scope.setUserData = function() {
           $scope.uploading = true;
           var file = document.getElementById('pict');
           $scope.user.photo = file.src;

           console.log($scope.user);
           $http({
                   method: 'POST',
                   url: '/setuserdata/',
                   data: $.param($scope.user),
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               })
               .success(function(data, status, headers) {
                   setTimeout(function() {
                       $scope.uploading = false;
                       $scope.$apply();
                   }, 1500);
               });

       }
       var validatePassword = function() {
           if (!$scope.pass.password || $scope.pass.password.length < 6) return false;
           if (!$scope.pass.repass || $scope.pass.repass.length < 6) return false;
           if (!$scope.pass.newpass || $scope.pass.newpass.length < 6) return false;
           if ($scope.pass.newpass != $scope.pass.repass) return false;

           return true;
       }
       $scope.setUserPassword = function() {
           if (validatePassword()) {
               $scope.uploading = true;

               console.log($scope.user);
               $http({
                       method: 'POST',
                       url: '/setuserpassword/',
                       data: $.param($scope.pass),
                       headers: {
                           'Content-Type': 'application/x-www-form-urlencoded'
                       }
                   })
                   .success(function(data, status, headers) {
                       setTimeout(function() {
                           $scope.pass = {};
                           $scope.uploading = false;
                           $scope.$apply();
                       }, 1500);
                   });
           } else {
               alert('Invalid input data!');
           }

       }




   });



   app.controller('menuBarCtl', function($scope) {
       $scope.homeUrl = "/";
       $scope.aboutUrl = "/#/about";
       $scope.usageUrl = "/#/usage";
       $scope.signInUrl = "/login/#/signin";
       $scope.signUpUrl = "/login/#/signup";
       $scope.profileUrl = "/profile";
       $scope.exitUrl = "/login/#/signin";
       $scope.uploadUrl = "/#/upload";

       tmp = localStorage.getItem('avatar');
       if (tmp) {
           $scope.avatar = tmp;
       } else {
           $scope.avatar = "/view/res/profile.png";
       }

       $scope.aboutDisabled = false;
       $scope.usageDisabled = false;


       if (getCookie('HDMtoken')) {
           $scope.profileDisabled = false;
       } else {
           $scope.profileDisabled = true;
       }

       $scope.webToolbar = true;
       switch (location.pathname) {
           case '/profile':
               break;
           case '/registration/statistic':
           case '/login/statistic':
               break;
           default:

               break;
       };

       switch (location.hash) {
           case '#/usage':
               $scope.usageDisabled = true;
               break;
           case '#/about':
               $scope.aboutDisabled = true;
               break;
       };



       $scope.menuType = function() {
           $scope.webToolbar = (window.screen.availWidth < 600 || window.innerWidth < 600) ? false : true;
           $scope.$apply();
       }
       window["onresize"] = $scope.menuType;
       $scope.init = function() {
           $scope.webToolbar = (window.screen.availWidth < 600 || window.innerWidth < 600) ? false : true;
       };

       $scope.uploadUrlFunc = function() {

           if (('/' + location.hash) != $scope.uploadUrl) {
               window.location.href = $scope.uploadUrl;
           } else {
               window.location.reload($scope.uploadUrl);
           }

       }



   });

   app.controller('indexCtl', function($scope, $http) {

       $scope.uploading = false;
       $scope.uploadStatus = 'Please select receipt photo...';
       $scope.choosedFile = '/view/res/icon_receipt.png';
       $scope.buttonText = 'Choose Photo';
       $scope.homeShow = false;

       if (location.hash == "#/upload" && !getCookie('HDMtoken')) {
           location.href = '/';
       } else if (location.pathname == "/" && location.hash == "" && getCookie('HDMtoken')) {
           location.href = '/statistic';
       } else {
           $scope.homeShow = true;
       }

       $scope.uploadFile = function() {
           if ($scope.buttonText == 'Cancel') {
               $scope.buttonText = 'Choose Photo';
               $scope.uploadStatus = 'Please select receipt photo...';
               $scope.choosedFile = '/view/res/icon_receipt.png';
               $scope.uploading = false;
               $scope.$apply();
           } else {
               var file = document.getElementById('receipt');
               file.click();
               file.onchange = function() {
                   $scope.sendReceipt(file);
               }
           }

       }

       $scope.sendReceipt = function(file) {
           var reader = new FileReader();

           reader.onload = function(e) {
               $scope.choosedFile = reader.result;
               $scope.$apply();
               $scope.postFile(file, reader.result);
           }
           reader.readAsDataURL(file.files[0]);

           $scope.uploadStatus = 'Please wait until file is uploading...'
           $scope.buttonText = 'Cancel';
           $scope.uploading = true;
           $scope.$apply();
       }

       $scope.postFile = function(file, fd) {

           $http({
                   method: 'POST',
                   url: '/upload/',
                   dataType: 'text',
                   data: fd,
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               })
               .success(function(data, status, headers) {
                   $scope.uploadStatus = 'Upload complated successfully!';
                   $scope.buttonText = 'Add photo';
                   $scope.cancelVisible = false;
                   $scope.uploading = false;
               })
               .error(function(err) {
                   console.log('error');
               })
       };




   });

   app.controller('loginedCtl', function($scope, ngTableParams, $http) {
       $http({
               method: 'GET',
               url: '/getuserdata/',
               data: '',
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               }
           })
           .success(function(data, status, headers) {
               localStorage.setItem('avatar', '/view/res/' + data.photo);
           });
       $scope.statisticVisible = false;
       tok = getCookie('HDMtoken');
       if (!tok) {
           location.href = '/';
           return;
       }
       $scope.statisticVisible = true;
       $scope.hellDiv = false;
       $scope.editWindow = function(user) {
           var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
           if (scrollTop > 0) {
               scrollTop = (window.screen.height / 2) - 300 + (scrollTop);
           } else {
               scrollTop = (window.screen.height / 2) - 300;
           }
           document.getElementById("editWindow").style.top = (scrollTop) + "px";
           document.getElementById("editWindow").style.display = "block";

           $scope.marketM = user.market;
           $scope.dateM = user.date;
           $scope.timeM = user.time;
           $scope.moneyM = user.price;
           $scope.noteM = user.item;

           $scope.hellDiv = true;
       }
       $scope.hideDiv = function() {
           $scope.hellDiv = false;
       }



       $scope.myDate = new Date(2015, 07, 05);
       $scope.minDate = new Date(2015, 07, 05);
       $scope.maxDate = new Date(2016, 07, 05);

       var data = [{
           market: "Sas",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Star",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Smile",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Book",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "KFC",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Star",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Smile",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Book",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "KFC",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Star",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Smile",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Book",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "KFC",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Star",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Smile",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "Book",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }, {
           market: "KFC",
           date: "12.12.12",
           time: "20:30",
           price: 3500,
           item: "---"
       }];

       $scope.tableParams = new ngTableParams({
           page: 1, // show first page
           count: 5, // count per page
           sorting: {
               name: 'asc' // initial sorting
           }
       }, {
           total: data.length, // length of data
           getData: function($defer, params) {
               $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
           }
       });

       $scope.moreVal = 5;
       $scope.more = function() {
           $scope.moreVal += 5;
           return $scope.moreVal += 5;
       }


       $scope.showGraph = function() {
           var lineChartData = {
               labels: [],
               datasets: [{
                   label: "My First dataset",
                   fillColor: "rgba(0, 92, 153,0.2)",
                   strokeColor: "rgba(220,220,220,1)",
                   pointColor: "rgba(220,220,220,1)",
                   pointStrokeColor: "#fff",
                   pointHighlightFill: "#fff",
                   pointHighlightStroke: "rgba(220,220,220,1)",
               }]
           }

           lineChartData.labels = ["Jan", "Feb", "Mch", "Apr", "May", "Jun", "Jly", "Aug", "Sep", "Oct", "Nov", "Dec"];
           lineChartData.datasets[0].data = [1000, 2000, 3000, 2000, 5000, 3000, 7000, 2200, 3010, 2541, 1254, 8000];

           var ctx = document.getElementById("iGraph").getContext("2d");
           var x = new Chart(ctx).Line(lineChartData, {
               maintainAspectRatio: true,
               responsive: true
           });

       }
   });