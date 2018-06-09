document.getElementById("telnummer").onclick = function()
{
    document.getElementById("telnummer").textContent = "(+49) 160 46";
    document.getElementById("telnummer").id = "neu";
    document.getElementById("neu").textContent += "211-89";
}

document.getElementById("adresse").onclick = function()
{
    document.getElementById("adresse").innerHTML = "<p> Christian Assenmacher<br>Bonner Straße 168<br>53757 Sankt Augustin<br>Germany";
}
