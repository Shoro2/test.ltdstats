/*
1. Check if name already exists
2. Check passwords
3. insert user
4. 




*/
console.log(mongocon);
console.lgo(MongoClient);

function getName(callback, reqname) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var resname = JSON.parse(xhttp.response);
            callback(resname);
        }
    };
    xhttp.open("GET", '/users/checkname?name=' + reqname, true);
    xhttp.send();
}

function queryName(reqname) {
    getName(function (result) {
        //console.log(result);
        if (result) {
            console.log("name vorhanden");
            //notification
        }
        else {
            console.log("name frei");
            //next
        }
        document.getElementById("mitte").style.display = "none";
        return result;
    }, reqname);
}