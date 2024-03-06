// Get the input element and add an event listener for the input event
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    // Get the value of the search input
    const searchTerm = searchInput.value.toLowerCase();
    
    // Perform search logic here (e.g., filter a list of items)
    // For demonstration purposes, let's just log the search term
    console.log('Search term:', searchTerm);
});
