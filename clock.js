function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // Add leading zeros if minutes or seconds are less than 10
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Choose between 12-hour or 24-hour format
    var timeFormat = 12;
    if (timeFormat === 12) {
        hours = (hours > 12) ? hours - 12 : hours;
        hours = (hours === 0) ? 12 : hours;
    }

    // Construct the string for display
    var timeString = hours + ":" + minutes + ":" + seconds;

    // Update the HTML element with id="clock" with the current time
    document.getElementById("clock").innerText = timeString;
}

// Call updateTime function every second to update the time
setInterval(updateTime, 1000);
