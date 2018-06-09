function saveTick(nummer)
{
    console.log("saveTick "+nummer);
    if (Cookies.enabled)
    {
        if(document.getElementById("checkbox"+nummer).checked==true)
        {
            Cookies.set("ladder_tickbox"+nummer, true)
        }
        else
        {
            Cookies.set("ladder_tickbox"+nummer, false)
        }
    }
}


function getTicks()
{
    if (Cookies.enabled)
    {
        if(typeof Cookies.get("ladder_tickbox0") !== 'undefined')
        {
            for(var i=0; i<document.getElementsByClassName("filter_input").length; i++)
            {
                if(Cookies.get("ladder_tickbox"+i) == 'true')
                {
                    document.getElementById("checkbox"+i).checked = true;
                }
                else
                {
                    document.getElementById("checkbox"+i).checked = false;
                }
            }
        }
        else
        {
            for(var i=0; i<document.getElementsByClassName("filter_input").length; i++)
            {
                Cookies.set("ladder_tickbox"+i, true);
                document.getElementById("checkbox"+i).checked = true;
            }
        }
        getFilters();
    }
}

function getPlayer()
{
    var playername = document.getElementById("playername").value;
    if(playername.length > 1) window.location.hash = playername;
    getStats();
}

function getStats()
{    
    var playerurl = window.location.href;
    playerurl = playerurl.substring(playerurl.lastIndexOf("#")+1);
    
    while(playerurl.includes("+"))
    {
        playerurl = playerurl.replace("+", " ");
    }
    if(playerurl=="https://test.ltdstats.com/ladder" || playerurl=="https://test.ltdstats.com/ladder#")
    {
        //top 100
        
    }
    else
    {
        //player rank

    }
}

function expandFilters()
{
    
    if(document.getElementById("filter-invis"))
    {
        var filter_obj = document.getElementById("filter-invis");
        filter_obj.id = "filter";
        var filter_note = document.getElementById("filter_display");
        filter_note.textContent = "Hide filters"
    }
    else
    {
        var filter_obj = document.getElementById("filter");
        filter_obj.id = "filter-invis";
        var filter_note = document.getElementById("filter_display");
        filter_note.textContent = "Show filters"
    }
}

function getFilters()
{
    var filters = document.getElementsByClassName("filter_input");
    for(var i=0; i<filters.length;i++)
    {
        if(filters[i].checked)
        {
            var filter_name = filters[i].value;
            
            var table_header = document.getElementById("th"+i);
            table_header.textContent = filter_name;
        }
        else
        {
            var table_header = document.getElementById("th"+i);
            table_header.textContent = "";
        }
    }
}

function selectAll()
{
    var filters = document.getElementsByClassName("filter_input");
    for(var i=0; i<filters.length;i++)
    {
        filters[i].checked=true;
        saveTick(i);
    }
    document.getElementById("selectall").textContent="Unselect all";
    document.getElementById("selectall").setAttribute("onClick", "javascript: selectNone();");
    getFilters();
}

function selectNone()
{
    var filters = document.getElementsByClassName("filter_input");
    for(var i=0; i<filters.length;i++)
    {
        filters[i].checked=false;
        saveTick(i);
    }
    document.getElementById("selectall").textContent="Select all";
    document.getElementById("selectall").setAttribute("onClick", "javascript: selectAll();");
    getFilters();
}
