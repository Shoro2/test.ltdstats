function getPlayer()
{
    var playername = document.getElementById("playername").value;
    window.location.hash = playername;
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
    if(playerurl=="https://test.ltdstats.com/stats")
    {
        document.getElementById("myChart").innerHTML="Select a player";
    }
}


function createChart()
{
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}