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

