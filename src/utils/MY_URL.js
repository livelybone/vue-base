import { queryString } from "utils/request-deal";

export default class MY_URL {
  urlReg = {
    url: /^(https?:)\/\/(([^:/?]*)?(:([^:/?]*))?@)?([^:/@]+)(:(\d+))?(\/[^?#]*)?(\?[^#]*)?(#\S*)?$/,
    protocol: {reg: /(https?:)/, index: 1},
    username: {reg: /([^:/?]*)(:[^:/?]*)?@[^/@]*[/?#]?/, index: 1},
    password: {reg: /:([^:/?]*)@[^/@]*[/?#]?/, index: 1},
    hostname: {reg: /((https?:\/\/)|(([^:/?]*)?(:[^:/?]*)?@))([^:/@]+)(:(\d+))?[/?#]?/, index: 6},
    port: {reg: /:(\d+)?([/?#]|$)/, index: 1},
    pathname: {reg: /([^/?#]+)?(\/[^?#]*)/, index: 2},
    search: {reg: /(\?[^#]*)/, index: 1},
    hash: {reg: /(#\S*)/, index: 1}
  };
  _protocol = '';
  _hostname = '';
  _port = '';
  _pathname = '';
  _search = '';
  _hash = '';
  _password = '';
  _username = '';
  encode = false;

  defaultURL = typeof window !== 'undefined' && window.location.href || 'http://0.0.0.0';

  constructor(url, queryString, encode) {
    this.href = url;
    if (queryString) this.queryString();
    this.encode = !!encode;
  }

  get href() {
    return this._protocol + '//' + this._username + (this._password && (':' + this._password)) + (this._username || this._password ? '@' : '') + this._hostname + (this._port && (':' + this._port)) + this._pathname + this._search + this._hash
  }

  set href(val) {
    const arr = val.match(this.urlReg.url);
    if (!arr && val.startsWith('http')) throw new Error('Invalid URL');
    else if (arr) {
      this._protocol = arr[1] || '';
      this._username = arr[3] || '';
      this._password = arr[5] || '';
      this._hostname = arr[6] || '';
      this._port = arr[8] || '';
      this._pathname = arr[9] || '/';
      this._search = arr[10] || '';
      this._hash = arr[11] || '';
    } else {
      const arrDefault = this.defaultURL.match(this.urlReg.url);
      this._protocol = (val.match(this.urlReg.protocol.reg) || [])[this.urlReg.protocol.index] || arrDefault[1] || '';
      this._username = (val.match(this.urlReg.username.reg) || [])[this.urlReg.username.index] || arrDefault[3] || '';
      this._password = (val.match(this.urlReg.password.reg) || [])[this.urlReg.password.index] || arrDefault[5] || '';
      this._hostname = (val.match(this.urlReg.hostname.reg) || [])[this.urlReg.hostname.index] || arrDefault[6] || '';
      this._port = (val.match(this.urlReg.port.reg) || [])[this.urlReg.port.index] || arrDefault[8] || '';
      this._pathname = (val.match(this.urlReg.pathname.reg) || [])[this.urlReg.pathname.index] || arrDefault[9] || '/';
      this._search = (val.match(this.urlReg.search.reg) || [])[this.urlReg.search.index] || arrDefault[10] || '';
      this._hash = (val.match(this.urlReg.hash.reg) || [])[this.urlReg.hash.index] || arrDefault[11] || '';
    }

    this._username = encodeURIComponent(this._username);
    this._password = encodeURIComponent(this._password);
    this._pathname = this._pathname.replace('//', '/');
  }

  get hash() {
    return this._hash;
  }

  set hash(val) {
    this._hash = val.startsWith('#') ? val : '#' + val;
  }

  get host() {
    return this._hostname + (this._port && (':' + this._port));
  }

  set host(val) {
    this._hostname = (val.match(this.urlReg.hostname.reg) || [])[this.urlReg.hostname.index] || '';
    this._port = (val.match(this.urlReg.port.reg) || [])[this.urlReg.port.index] || '';
  }

  get hostname() {
    return this._hostname;
  }

  set hostname(val) {
    this._hostname = val;
  }

  get origin() {
    return this._protocol + '//' + this._hostname + (this._port && (':' + this._port));
  }

  set origin(val) {
    this._protocol = (val.match(this.urlReg.protocol.reg) || [])[this.urlReg.protocol.index] || '';
    this._hostname = (val.match(this.urlReg.hostname.reg) || [])[this.urlReg.hostname.index] || '';
    this._port = (val.match(this.urlReg.port.reg) || [])[this.urlReg.port.index] || '';
  }

  get pathname() {
    return this._pathname;
  }

  set pathname(val) {
    this._pathname = val.replace('//', '/');
  }


  get port() {
    return this._port;
  }

  set port(val) {
    this._port = val;
  }

  get protocol() {
    return this._protocol;
  }

  set protocol(val) {
    this._protocol = val;
  }

  get search() {
    return this._search;
  }

  set search(val) {
    this._search = val;
  }

  get username() {
    return this._username;
  }

  set username(val) {
    this._username = val;
  }

  get password() {
    return this._password;
  }

  set password(val) {
    this._password = val;
  }

  toString() {
    return this.href;
  }

  queryString() {
    this.query = {};
    if (this._search.length < 2) return;
    const arr = this._search.slice(1).split('&');
    arr.map(str => {
      const ar = str.split('=');
      this.query[ar[0]] = ar[1];
    })
  }

  setQuery(key, val) {
    this.query[key] = val;
    this.search = '?' + queryString(this.query, this.encode);
  }

  assignQuery(query) {
    this.query = {...this.query, query};
    this.search = '?' + queryString(this.query, this.encode);
  }
}

