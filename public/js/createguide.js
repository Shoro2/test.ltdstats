function save() {
    //check if form is filled
    error = 0;
    if (document.getElementById("input_preamble").value.length > 0) preamble = document.getElementById("input_preamble").value;
    else error=1;
    if (document.getElementById("input_author").value.length > 0) author = document.getElementById("input_author").value;
    else error = 2;
    if (document.getElementById("input_section").value.length > 0) section = document.getElementById("input_section").value;
    else error = 3;
    if (document.getElementById("input_version").value.length > 0) version = document.getElementById("input_version").value;
    else error = 4;
    if (document.getElementById("input_title").value.length > 0) title = document.getElementById("input_title").value;
    else error = 5;
    wave = [];
    for (var i = 1; i < 22; i++) {
        if (document.getElementById("input_w" + i).value.length > 0) wave[i] = document.getElementById("input_w" + i).value;
        else error = 5+i;
    }
    if (error == 0) {
        waves = "";
        for (var i = 1; i < 22; i++) {
            waves += "<p><b>Wave " + i + ":</b><br>" + wave[i];
        }

        var html = "<b> Preview:</b><p><div class='guide_content'><h2>"+title+"</h2>" + preamble + "<p>" + waves + "</div><div class='guide_infobox'><div class='infobox_author'> Author: " + author + "</div><div id='infobox_version'> Version: " + version + "</div><div id='infobox_section'> Section: " + section + " Guides<br></div></div>";
        
        if (html.includes("<script") || html.includes("<button") || html.includes("onclick")) {
            console.log("fuck you: "+html);
            html = "<h1>Dont fuck with me</h1>";
        }
        
        document.getElementById("preview").innerHTML = html;
        console.log(document.getElementById("sendbutton"));
        if (document.getElementById("sendbutton") == null) {
            meinButton = document.createElement("button");
            meinButton.id = "sendbutton";
            meinButton.innerHTML += "Send";
            document.getElementsByClassName("guide_infobox")[0].appendChild(meinButton);
            document.getElementById("sendbutton").onclick = function () { sendGuide();};
            console.log("add button");
            }
        

    }
    else {
        switch (error) {
            case 1:
                console.log("no preamble");
                break;
            case 2:
                console.log("no author");
                break;
            case 3:
                console.log("no section");
                break;
            case 4:
                console.log("no version");
                break;
        }
        if (error > 3) {
            console.log("no wave" + (error - 4));
        }
    }
    toggleView();
}

function toggleView() {
    if (document.getElementById("guide").style.display == "") {
        document.getElementById("preview_box").style.display = "";
        document.getElementById("guide").style.display = "none";
    }
    else {
        document.getElementById("preview_box").style.display = "none";
        document.getElementById("guide").style.display = "";
    }
}

function sendGuide() {
    if (error == 0) {
        console.log("guide uploading");
        document.getElementById("mitte").style.display = "";
        document.getElementsByClassName("p")[0].textContent = "Uploading Guide, please wait...";
        queryUploadGuide();
    }
    else {
        console.log("missing content, error-code: "+error);
    }
}

function uploadGuide(callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var answer = xhttp.response;
            callback(answer);
        }
    };

    xhttp.open("GET", '/guides?guide=upload&waves=' + waves + '&author=' + author + '&version=' + version + '&section=' + section + '&title=' + title + '&preamble=' + preamble, true);
    xhttp.send();
}

function queryUploadGuide() {
    uploadGuide(function (result) {
        if (!result) {
            document.getElementsByClassName("p")[0].textContent = "Upload failed, please report this on the forums.";
        }
        else {
            result = JSON.parse(result);
            if (result == "bad url") {
                document.getElementsByClassName("p")[0].textContent = "Bad content, please remove any script/button/onclicks in your guide.";
            }
            else if (result == "db error") {
                document.getElementsByClassName("p")[0].textContent = "DB Error, please report this on the forums.";
            }
            else if (result == "success") {
                console.log("success");
                document.getElementsByClassName("gif")[0].style.display = "none";
                document.getElementsByClassName("p")[0].innerHTML = "Guide Uplaoded.<br><a href='/guides?guide=new'>Go ahead</a>";
                
            }
            
        }
    });
}