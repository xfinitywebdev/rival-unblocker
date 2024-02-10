$(document).ready(function() {
    // Function to fetch proxy content from server
    function fetchProxyContent() {
        $.get('/api/proxy', function(data) {
            $('body').html(data);
        }).fail(function() {
            $('body').html('Error fetching proxy content.');
        });
    }

    // Call fetchProxyContent() initially
    fetchProxyContent();

    // Update proxy content every 10 seconds
    setInterval(fetchProxyContent, 10000); // 10000 milliseconds = 10 seconds
});
