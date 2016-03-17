app.controller('myCtrl', function($scope) {
    $scope.showHell = false;
    $scope.showEditWindow = false;
    $scope.myarr = [ {
        market: 'First',
        date: '12-01-2016',
        time: '12:01',
        money: '5000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Second',
        date: '12-02-2016',
        time: '12:01',
        money: '31000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Third',
        date: '12-03-2016',
        time: '12:01',
        money: '13000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Four',
        date: '12-04-2016',
        time: '12:01',
        money: '5000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Five',
        date: '12-05-2016',
        time: '12:01',
        money: '18000',
        item: 'empty',
        path: 'photo0001.jpg'
    }]



    /**function count, which shows 3 rows on every click 'more' button*/

    var count = (function() {
        var num = 0;
        return function() {
            var first = num;
            num += 3;
            for (var i = first; i < num + 3 && i <= myDb.count; ++i) {
                document.getElementById("myTable").rows[i].style.display = "table-row";
            }
        }
    })()

    /**function, which hides all rows beside first three rows*/
    var hideOtherRows = function(number) {
        for (var i = number; i <= myDb.count; ++i) {
            document.getElementById("myTable").rows[i].style.display = "none";
        }
    }

    /*adds row for new input*/
    function addRow() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0) {
            scrollTop = (window.screen.height / 2) - 300 + (scrollTop / 16);
        } else {
            scrollTop = (window.screen.height / 2) - 300;
        }
        document.getElementById("editWindow").style.top = (scrollTop) + "px";
        document.getElementById("editWindow").style.display = "block";

    }
    // hides edit div after canceling or saveing
    $scope.hideDiv = function() {
            $scope.showHell = false;
            $scope.showEditWindow = false;
        }
        // edits the row
    $scope.editRow = function(i) {
        addRow();

        $scope.marketM = i.market;
        $scope.dateM = i.date;
        $scope.timeM = i.time;
        $scope.moneyM = i.money;
        $scope.noteM = i.item;

        $scope.showHell = true;
        $scope.showEditWindow = true;

    }

	$scope.fromDate='2016-01-01';
	$scope.toDate='2016-03-01';

    var httpGet=function() {
   	var reqUrl='http://127.0.0.1:8080/user?from='+$scope.fromDate+'&to='+$scope.toDate
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", reqUrl, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send();
    if (xmlHttp.status != 200) {
            alert(xmlHttp.status + ': ' + xmlHttp.statusText);
            return null;
    } else {
            return JSON.parse(xmlHttp.responseText);
        }

 }
    $scope.filterData=function(){
    	$scope.myarr=httpGet();
    	$scope.showGraph();
    }


    $scope.showGraph=function() {

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
            data:[]
        }]
    }

    	for(i in $scope.myarr){
    		lineChartData.labels.push($scope.myarr[i].date);
    		lineChartData.datasets[0].data.push($scope.myarr[i].money)
    	}
    	console.log(lineChartData.labels);
    	console.log(lineChartData.datasets[0].data);
       
    var ctx = document.getElementById("canvas").getContext("2d");
    var x = new Chart(ctx).Line(lineChartData, {
        maintainAspectRatio: true,
        responsive: true
    });


}




});