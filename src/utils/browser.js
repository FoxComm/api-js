import _ from 'lodash';

export const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

const scriptExists = (path) => {
  const scripts = document.getElementsByTagName('script');
  return _.some(scripts, (script) => script.src === path);
};

export const loadScript = (path) => {
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
};
