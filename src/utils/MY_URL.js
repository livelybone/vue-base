import { queryString } from "utils/request-deal";

export default class MY_URL {
  _protocol = '';
  _hostname = '';
  _port = '';
  _pathname = '';
  _search = '';
  _hash = '';
  _password = '';
  _username = '';
  encode = false;

  constructor(url, queryString, encode) {
    this.href = url;
    if (queryString) this.queryString();
    this.encode = encode;
  }

  get href() {
    return this._protocol + '//' + this._username + (this._password && (':' + this._password)) + (this._username || this._password ? '@' : '') + this._hostname + (this._port && (':' + this._port)) + this._pathname + this._search + this._hash
  }

  set href(val) {
    const urlReg = /^(https?:)\/\/(([^:/]*):([^:/]*)@)?([^:/]+)(:(\d+))?(\/[^?#]+)(\?[^#]+)(#\S*)?$/;
    const arr = val.match(urlReg) || [];
    this._protocol = arr[1] || "http:";
    this._hostname = arr[5] || "127.0.0.1";
    this._port = arr[7] || "";
    this._pathname = arr[8] || "/";
    this._search = arr[9] || "";
    this._hash = arr[10] || "";
    this._password = arr[4] || "";
    this._username = arr[3] || "";
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
    this._hostname = (val.match(/(\S+)(:\d+)?/) || [])[1] || '127.0.0.1';
    this._port = (val.match(/:(\d+)/) || [])[1] || '';
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
    this._protocol = (val.match(/(https?:)/) || [])[1] || "http:";
    this._hostname = (val.match(/:\/\/([^:/]+)(:\d+)?/) || [])[1] || "127.0.0.1";
    this._port = (val.match(/:(\d+)/) || [])[1] || "";
  }

  get pathname() {
    return this._pathname;
  }

  set pathname(val) {
    this._pathname = val;
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

