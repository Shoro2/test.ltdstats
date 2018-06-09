function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    if(document.getElementById("mycheck").checked == true)
    {
        if (Cookies.enabled)
        {
            Cookies.set("dontshow", "true", { expires: 604800 });
        }
    }
}

function checkAds()
{
    if( window.canRunAds === undefined )
    {
        // adblocker detected, show fallback
        if(Cookies.get("dontshow")=="true")
        {
            
        }
        else on();
        
      }
      else
      {

      }
}

