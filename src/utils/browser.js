import _ from 'lodash';

export function isBrowser() {
  try {
    return window;
  } catch (e) {
    return false;
  }
}

function scriptExists(path) {
  const scripts = document.getElementsByTagName('script');
  return _.some(scripts, script => script.src === path);
}

export function loadScript(path) {
  return new Promise((resolve, reject) => {
    if (document === void 0 || scriptExists(path)) {
      return;
    }

    const script = document.createElement('script');
    script.onload = resolve;
    script.onerror = reject;
    script.src = path;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}
