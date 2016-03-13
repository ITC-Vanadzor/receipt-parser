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




function showGraph() {

    var constX = 50;
    var constY = 50;
    var constK = 60;

    document.getElementById('iGraph').style.display = 'block';

    myDb.sortByDate(); //sorting by date
    dateFrom = myDb.item[0].date;
    dateTo = myDb.item[myDb.count - 1].date;
    var notOneYear = dateTo.getFullYear() - dateFrom.getFullYear();
    var minYear = dateFrom.getFullYear();

    if (notOneYear) {
        notOneYear++;
        notOneYear = (notOneYear > 8) ? 8 : notOneYear;
    } else {
        notOneYear = 1;
    }

    var uniArr = myDb.unionDays(); //union repeated days


    //geting canvas object
    var canvObj = document.getElementById("iGraph"),
        ctx = iGraph.getContext('2d');
    canvObj.width = 800;
    canvObj.height = 400;

    //X and Y coordinates 
    ctx.strokeStyle = 'green';
    ctx.fillRect(constX, constY, canvObj.width - 2 * constX, canvObj.height - 2 * constY);
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    for (var i = constX; i < canvObj.width - constX; i += 7) {
        ctx.moveTo(i, constX);
        ctx.lineTo(i, canvObj.height - constY);

    }
    for (var i = constY; i < canvObj.height - constY; i += 7) {
        ctx.moveTo(constX, i);
        ctx.lineTo(canvObj.width - constX, i);

    }
    ctx.stroke();

    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(constX, constY);
    ctx.lineTo(constX, canvObj.height - constY);
    ctx.lineTo(canvObj.width - constX, canvObj.height - constY);
    ctx.stroke();


    ctx.font = "15px Arial";
    if (notOneYear > 1) {

        var counter = 0;
        var interval = 700 / notOneYear;

        for (i = dateFrom.getFullYear(); counter < notOneYear; ++i, counter++) {
            ctx.fillText(i, counter * interval + constX, canvObj.height - (constY - 20));
        }

    } else {

        var mnth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jly", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (i in mnth) {
            ctx.fillText(mnth[i], i * 55 + constX, canvObj.height - (constY - 20));
        }

    }



    var money = [1000, 2000, 3000, 4000, 5000, 6000];
    for (i in money) {
        ctx.fillText(money[i], 10, (canvObj.height - 50) - (i * 55));
    }

    ctx.lineWidth = 3;
    var grd = ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, '#ffff80');
    grd.addColorStop(1, '#a64dff');

    ctx.strokeStyle = grd;
    ctx.beginPath();
    for (var i = 0; i < uniArr.count; ++i) {
        var intervalYear = uniArr.item[i].date.getFullYear();
        intervalYear -= minYear;
        intervalYear = 700 / notOneYear * intervalYear;
        interval = 60 / notOneYear;

        x = intervalYear + (uniArr.item[i].date.getMonth()) * interval + 55 + uniArr.item[i].date.getDate();
        y = uniArr.item[i].money * (canvObj.height - 50) / 6000;
        y = canvObj.height - y;
        if (i) {
            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
        } else {
            ctx.moveTo(x, y);
        }
        ctx.stroke();

    }

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
    document.getElementById("editWindow").style.display="block";
}
// hides edit div after canceling or saveing
function hideDiv()
{
        document.getElementById("editWindow").style.display="none";     
}
// edits the row
function editRow(i)
{
    addRow();
    document.getElementById("Market").placeholder=myDb.item[i].name;
    document.getElementById("Date").placeholder=myDb.item[i].date;
    document.getElementById("Time").placeholder=myDb.item[i].time;
    document.getElementById("Price").placeholder=myDb.item[i].money;
    document.getElementById("Item").placeholder=myDb.item[i].item;


}

function table() 
{
    showGraph();
    document.getElementById("editWindow").style.display="none"; 
    var myTable = document.getElementById("myTable");
    // myTable.setAttribute("style", "width:50% ; margin:5% 10% 0%; padding:0%;");
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
/*function, which filters using dates*/
function Filter() 
{

    var fromDate=new Date(document.getElementById("firstDate").value);

    var toDate=new Date(document.getElementById("secondDate").value);
        
    hideOtherRows(1);

    for (var i = 0; i < myDb.count; ++i) 
    {

        tmpTime=myDb.item[i].date.value;

        

            if (tmpTime >= fromDate && tmpTime <=toDate) 
        {
            alert(tmpTime+' | '+fromDate+' | '+toDate)
                    document.getElementById("myTable").rows[i+1].style.display = "table-row";

                }   

     }



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
