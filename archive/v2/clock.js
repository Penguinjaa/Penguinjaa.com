function startTime() {
  const options = {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Los_Angeles'
  };

  const pstFormatter = new Intl.DateTimeFormat('en-US', options);
  const pstTime = pstFormatter.format(new Date());

  document.getElementById('clock').innerHTML = pstTime;
  setTimeout(startTime, 1000);
}

startTime();
