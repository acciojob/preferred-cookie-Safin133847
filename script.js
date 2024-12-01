function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookies = decodedCookies.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return '';
}

function applyPreferences() {
  const fontsize = getCookie('fontsize');
  const fontcolor = getCookie('fontcolor');

  if (fontsize) {
    document.documentElement.style.setProperty('--fontsize', fontsize + 'px');
    document.getElementById('fontsize').value = fontsize;
  }
  if (fontcolor) {
    document.documentElement.style.setProperty('--fontcolor', fontcolor);
    document.getElementById('fontcolor').value = fontcolor;
  }
}

document.getElementById('preferencesForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const fontsize = document.getElementById('fontsize').value;
  const fontcolor = document.getElementById('fontcolor').value;

  setCookie('fontsize', fontsize, 365);
  setCookie('fontcolor', fontcolor, 365);

  applyPreferences();
});

window.onload = function () {
  applyPreferences();
};
