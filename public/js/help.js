function expandImg(nummer) {
    var meinimg = document.getElementById("img_" + nummer);
    var pfad = meinimg.getAttribute("src");
    document.getElementById("bigimg").innerHTML = "<img src='" + pfad + "' id='img_big' onclick='smallImg();'>";
    document.getElementById("bigimg").style.display = "initial";
}

function smallImg() {
    document.getElementById("bigimg").style.display = "none";
}