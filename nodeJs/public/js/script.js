function showDiv(divId) {

    document.getElementById("forgotPassDiv").style.display = "none";
    document.getElementById("signInDiv").style.display = "none";
    document.getElementById("signUpDiv").style.display = "none";

    if (typeof divId === 'undefined') {
        divId = location.href.match('[?]..(.+?)$');
        if (divId) {
            divId = divId[1];
        }
    }

    if (!divId) {
        divId = 'signInDiv';
    }
    switch (divId) {
        case 'signUpDiv':
            document.title = "Create account";
            break;
        case 'forgotPassDiv':
            document.title = "Forgot password";
            break;
        default:
            document.title = "Sign In to HDM";
            divId = 'signInDiv';

    }
    document.getElementById(divId).style.display = "block";
}


function progressSteps(idProgress, idCircle, idStep) {

    document.getElementById("thirdStep").style.display = "none";
    document.getElementById("secondStep").style.display = "none";
    document.getElementById("firstStep").style.display = "none";

    document.getElementById(idStep).style.display = "block";


    document.getElementById("thirdCircle").style.background = "linear-gradient(to top, #0094F7, #007acc)";
    document.getElementById("secondCircle").style.background = "linear-gradient(to top, #0094F7, #007acc)";
    document.getElementById("firstCircle").style.background = "linear-gradient(to top, #0094F7, #007acc)";
    document.getElementById(idCircle).style.background = "#999999";

    document.getElementById("thirdProgress").style.background = "#bfbfbf";
    document.getElementById("secondProgress").style.background = "#bfbfbf";
    document.getElementById("firstProgress").style.background = "#bfbfbf";

    switch (idProgress) {
        case 'thirdProgress':
            document.getElementById("thirdProgress").style.background = "#007acc";
        case 'secondProgress':
            document.getElementById("secondProgress").style.background = "#007acc";
        case 'firstProgress':
            document.getElementById("firstProgress").style.background = "#007acc";
    }

}




/*Database structure */
function DatabaseItem(name, date, money,note) {
    this.name = name;
    this.date = date;
    this.money = money;
    this.note=(note)?note:"";
    this.getArray = function() {
        var arr = [this.name, this.date.toLocaleDateString(), this.date.toLocaleTimeString(), this.money];
        return arr;
    }
}

function Database() {
    this.item = []
    this.count = 0;


    /*adding new item*/
    this.addItem = function(name, date, money) {
        this.item[this.count++] = new DatabaseItem(name, date, money);
    }

    /*sort array by Date*/
    this.sortByDate = function() {

            this.item.sort(function(a, b) {
                return a.date.getTime() - b.date.getTime();
            });

        }
    /*sort array by Price*/
    this.sortByPrice = function() {

        this.item.sort(function(a, b) {
            return a.money - b.money;
        });

    }

    /*sort array by Market*/
    this.sortByMarket = function() {

        this.item.sort(function(a, b) {
            return (a.name > b.name) ? 1 : -1
        });

    }

    /*Union repeated days*/
    this.unionDays = function() {

        var result = new Database();

        for (i = 1; i < this.count; ++i) {
            tmpDate = this.item[i - 1].date;
            tmpMoney = this.item[i - 1].money;
            tmpName = this.item[i - 1].name;

            while (this.item[i].date == tmpDate && i < this.count) {
                tmpMoney += this.item[i].money;
                tmpName = tmpName + ' & ' + this.item[i].name;
                ++i;
            }
            result.addItem(tmpName, tmpDate, tmpMoney);
        }
        return result;
    }


}

var myDb = new Database();

myDb.addItem("smile", new Date(2016, 8, 23, 14, 14), 2000);
myDb.addItem("jyre", new Date(2016, 11, 2, 23, 32), 1000);
myDb.addItem("jumper", new Date(2016, 4, 7, 12, 50), 2010);
myDb.addItem("classile", new Date(2016, 4, 21, 12, 32), 5700);
myDb.addItem("grand", new Date(2016, 7, 4, 4, 45), 4110);
myDb.addItem("book", new Date(2016, 8, 9, 12, 10), 2200);
myDb.addItem("mans", new Date(2016, 8, 23, 10, 30), 2100);
myDb.addItem("jeny", new Date(2016, 9, 1, 10, 41), 5000);
myDb.addItem("sumy", new Date(2016, 10, 9, 15, 00), 3000);
myDb.addItem("star", new Date(2016, 3, 8, 22, 20), 1500);
myDb.addItem("classile", new Date(2017, 4, 21, 12, 32), 5700);



var getXItem=function(f,t){
 
    var years=t.getFullYear()-f.getFullYear();

    if(years && years>2){
        result=[];
        for(var i=f.getFullYear();i<=t.getFullYear(); ++i){
            result.push(i);
        }
        return result;
    }
    else if(years){
        return ["esiminch","esiminch","esiminch"];
    }
    else{
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jly", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }
}


function showGraph() {

    var lineChartData = {
            labels: [],
            datasets : [
                {
                    label: "My First dataset",
                    fillColor : "rgba(0, 92, 153,0.2)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                }
            ]
        }

    myDb.sortByDate(); //sorting by date
    var uniArr = myDb.unionDays(); //union repeated days

    if(uniArr.count){
       var from_date=uniArr.item[0].date;
       var to_date=uniArr.item[uniArr.count-1].date;
        lineChartData.labels=getXItem(from_date,to_date);

    }


    lineChartData.datasets[0].data=[,,1000,2000,3000,2000,5000,3000,7000,2200,3010];

    var ctx = document.getElementById("canvas").getContext("2d");
    var x=new Chart(ctx).Line(lineChartData, {
            maintainAspectRatio: true,
            responsive: true
        });


}


/*date converting into format Date*/

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
function addRow()   
{
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop>0){
		scrollTop=(window.screen.height/2)-300+(scrollTop/16);
	}
    else{
		scrollTop=(window.screen.height/2)-300;
	}
    document.getElementById("editWindow").style.top=(scrollTop)+"px";
    document.getElementById("hellBg").style.display="block";
    document.getElementById("editWindow").style.display="block";

}
// hides edit div after canceling or saveing
function hideDiv()
{
    document.getElementById("hellBg").style.display="none";
    document.getElementById("editWindow").style.display="none";     
}
// edits the row
function editRow(i)
{
    addRow();
    document.getElementById("Market").value=myDb.item[i].name;
    document.getElementById("Date").value=myDb.item[i].date.toLocaleDateString();
    document.getElementById("Time").value=myDb.item[i].date.toLocaleTimeString();
    document.getElementById("Price").value=myDb.item[i].money;
    document.getElementById("Item").value=myDb.item[i].item;


}

function table() 
{
    showGraph();
    document.getElementById("editWindow").style.display="none"; 
    var myTable = document.getElementById("myTable");
    var header = myTable.createTHead();
    var headerRow = header.insertRow(0);
     Head = ["Market", "Date", "Time", "Price", "Item"];
    for (var i = 0; i < Head.length; ++i) 
    {
        var dataDate = headerRow.insertCell(i);
        dataDate.innerHTML = Head[i];
        dataDate.setAttribute("style", "font-weight: bold;");

    }    
                            
    
            
    for (var i = 0; i < myDb.count; i++) 
    {
        tmp = myDb.item[i].getArray();
    
        var row = document.createElement("tr");
    row.setAttribute('onclick','editRow('+i+')');
        for (s in tmp) 
    {
    
            var cell = document.createElement("td");
            var cellText = document.createTextNode(tmp[s]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
    
    row.appendChild(document.createElement("td"));
    myTable.appendChild(row);
    }
     
     
    myTable.setAttribute("border", "2");
    hideOtherRows(3);
}



/* Usage page*/
/* function for progress usage page*/
function progressSteps(idProgress, idCircle, idStep) {

    document.getElementById("thirdStep").style.display = "none";
    document.getElementById("secondStep").style.display = "none";
    document.getElementById("firstStep").style.display = "none";

    document.getElementById(idStep).style.display = "block";


    document.getElementById("thirdCircle").style.background = "linear-gradient(to top, #0094F7, #007acc)";
    document.getElementById("secondCircle").style.background = "linear-gradient(to top, #0094F7, #007acc)";
    document.getElementById("firstCircle").style.background = "linear-gradient(to top, #0094F7, #007acc)";
    document.getElementById(idCircle).style.background = "#999999";

    document.getElementById("thirdProgress").style.background = "#bfbfbf";
    document.getElementById("secondProgress").style.background = "#bfbfbf";
    document.getElementById("firstProgress").style.background = "#bfbfbf";

    switch (idProgress) {
        case 'thirdProgress':
            document.getElementById("thirdProgress").style.background = "#007acc";
        case 'secondProgress':
            document.getElementById("secondProgress").style.background = "#007acc";
        case 'firstProgress':
            document.getElementById("firstProgress").style.background = "#007acc";
    }

}


function httpGet(theUrl)
{

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://127.0.0.1:8080/user/',true); 
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send();  
    xmlHttp.onreadystatechange = function() { 
       
            if (xmlHttp.readyState != 4) return;

            if (xmlHttp.status != 200) {
                    alert(xmlHttp.status + ': ' + xmlHttp.statusText);
            } else {
                    alert(JSON.parse(xmlHttp.responseText).k);
            }

}
}