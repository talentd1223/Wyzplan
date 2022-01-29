
function setTimezoneCookie() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.cookie = "browser.timezone=" + tz + ";path=/";
}

setTimezoneCookie()
