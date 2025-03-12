export function setCookie(name, value, options = {}) {
  let cookieString = `${name}=${value};path=/`;

  if (options.sameSite) {
    cookieString += `;SameSite=${options.sameSite}`;
  }

  if (options.expires) {
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }

  document.cookie = cookieString;
}
