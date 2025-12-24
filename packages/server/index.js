// În acest fișier, mp este injectat de RAGE dacă loader.mjs îl încarcă corect
if (typeof mp !== 'undefined') {
    global.mp = mp;
}

require('./dist/index.js');
