function request()
{
    $.ajax({
         url: "https://ktodm4htn1.execute-api.us-east-1.amazonaws.com/dev/",
         headers: {"x-api-key":"VOcvzORZaP9GdjdOzjcyG5wzW0aSwkSU7Tp7Cxqn"},
         type: "GET",
         success: function() { alert('Success!'); },
         error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg);
        }

      });
}