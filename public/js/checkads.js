function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    if (document.getElementById("mycheck").checked == true) {
        if (Cookies.enabled) {
            Cookies.set("dontshow", "true", { expires: 604800 });
        }
    }
}

function checkAds() {
    if (window.canRunAds === undefined) {
        // adblocker detected, show fallback
        if (Cookies.get("dontshow") == "true") {
        }
        else on();

    }
    else {
        //
    }
}

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

function checkAnalytics() {
    if (window.localStorage.getItem("analytics") != 'false') {
        
        $.loadScript("https://www.googletagmanager.com/gtag/js?id=UA-111925592-1", function () {
            $.loadScript("/js/analytics.js", function () {
                console.log("analytics enabled");
                console.log(window.localStorage.getItem("analytics"));
            });
        });
        
    }
    else {
        console.log(window.localStorage.getItem("analytics"));
        console.log("analytics disabled");
    }
}




function getLanguage(callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse("{"+xhttp.response+"}");
            callback(response);
        }
    };
    xhttp.open("GET", '/getLang', true);
    xhttp.send();
}

function queryLanguage() {
    console.log(window.localStorage.getItem("country"));
    if (document.getElementById("amazon_ad") != null) {
        if (window.localStorage.getItem("country") != null) {
            switch (window.localStorage.getItem("country")) {
                case "Germany":
                    document.getElementById("amazon_ad").innerHTML = '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=288&l=ez&f=ifr&linkID=523d3b32ae00df80c905251cf63684d3&t=gvrmrmister-21&tracking_id=gvrmrmister-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                    break;
                case "United States":
                    document.getElementById("amazon_ad").innerHTML = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ez&f=ifr&linkID=97185a09898be0d37511b04811fe6cc6&t=gvrmrmister-20&tracking_id=gvrmrmister-20" width="468" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                    break;
                case "United Kingdom":
                    document.getElementById("amazon_ad").innerHTML = '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=288&l=ez&f=ifr&linkID=0478fbef3e49f44c9b04d2bfaff69e56&t=gvrmrmister07-21&tracking_id=gvrmrmister07-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                    break;
                default:
                    document.getElementById("amazon_ad").innerHTML = '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=288&l=ez&f=ifr&linkID=523d3b32ae00df80c905251cf63684d3&t=gvrmrmister-21&tracking_id=gvrmrmister-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                    break;
            }
            checkAds();
        }
        else {
            getLanguage(function (result) {
                switch (result.country_name) {
                    case "Germany":
                        document.getElementById("amazon_ad").innerHTML = '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=288&l=ez&f=ifr&linkID=523d3b32ae00df80c905251cf63684d3&t=gvrmrmister-21&tracking_id=gvrmrmister-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                        break;
                    case "United States":
                        document.getElementById("amazon_ad").innerHTML = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ez&f=ifr&linkID=97185a09898be0d37511b04811fe6cc6&t=gvrmrmister-20&tracking_id=gvrmrmister-20" width="468" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                        break;
                    case "United Kingdom":
                        document.getElementById("amazon_ad").innerHTML = '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=288&l=ez&f=ifr&linkID=0478fbef3e49f44c9b04d2bfaff69e56&t=gvrmrmister07-21&tracking_id=gvrmrmister07-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                        break;
                    default:
                        document.getElementById("amazon_ad").innerHTML = '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=288&l=ez&f=ifr&linkID=0478fbef3e49f44c9b04d2bfaff69e56&t=gvrmrmister07-21&tracking_id=gvrmrmister07-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
                        break;
                }
                window.localStorage.setItem("country", result.country_name);
                checkAds();
                return result;
            });
        }
    }
    
    
}

// de: <iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=288&l=ez&f=ifr&linkID=523d3b32ae00df80c905251cf63684d3&t=gvrmrmister-21&tracking_id=gvrmrmister-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>
// us: <iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ez&f=ifr&linkID=97185a09898be0d37511b04811fe6cc6&t=gvrmrmister-20&tracking_id=gvrmrmister-20" width="468" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>
// gb: <iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=288&l=ez&f=ifr&linkID=0478fbef3e49f44c9b04d2bfaff69e56&t=gvrmrmister07-21&tracking_id=gvrmrmister07-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>