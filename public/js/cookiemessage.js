window.addEventListener("load", function()
{
    window.cookieconsent.initialise(
    {
        "palette": 
        {
            "popup": 
            {
                "background": "white",
                "text": "black",
                "opacity": "0.8"
            },
            "button": 
            {
                "background": "lightgray"
            }
        },
        "theme": "classic",
        "position": "bottom",
        "static": false,
        "content": 
        {
            "message": "This website uses cookies to analyze its users behaviour to improve users experience. No data is sold or given out to other third parties.",
            "href": "https://ltdstats.com/policy"
        }
    })
});