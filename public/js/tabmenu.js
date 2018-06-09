/**
* öffnet ein Tab (klick auf oberen Tab (Reiter).
* @param index: welcher Tab wurde geklickt, 1 bis n.
*/
function openTab(index)
{
	var element = document.getElementsByTagName('div');
	var name = "";
    var obj;
    
	
	for (var i = 0; i < element.length; i++)
	{
        name = element[i].id;
		if (name.substr(0,8) == 'tab_box_')
		{
            
            obj = document.getElementById(name);
            obj.hidden = true;
            if(obj.id.substr(obj.id.length-1)=="1" && index>1) $("#tab_box_1").fadeOut();		
            if(obj.id.substr(obj.id.length-1)=="2" && index>1) $("#tab_box_2").fadeOut();	
            if(obj.id.substr(obj.id.length-1)=="3" && index>1) $("#tab_box_3").fadeOut();	
            if(obj.id.substr(obj.id.length-1)=="4" && index>1) $("#tab_box_4").fadeOut();	
		}
		if (name.substr(0,8) == 'tab_top_')
		{
			obj = document.getElementById(name);
            obj.setAttribute('class','tab_top_passive');	
		}
		
    }
	var tab = document.getElementById("tab_box_"+index);
	tab.hidden = false;
	tab = document.getElementById("tab_top_"+index);
    tab.setAttribute('class','tab_top_active');
}

function openFirstTab()
{
	var element = document.getElementsByTagName('div');
	var name = "";
    var obj;
	for (var i = 0; i < element.length; i++)
	{
        name = element[i].id;
		if (name.substr(0,8) == 'tab_box_')
		{
            
            obj = document.getElementById(name);
            obj.hidden = true;
		}
		if (name.substr(0,8) == 'tab_top_')
		{
			obj = document.getElementById(name);
            obj.setAttribute('class','tab_top_passive');	
            
		}
    }
	var tab = document.getElementById("tab_box_1");
	tab.hidden = false;
	tab = document.getElementById("tab_top_1");
    tab.setAttribute('class','tab_top_active');
}

