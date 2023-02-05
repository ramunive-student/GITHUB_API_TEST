const request = require("request-promise");
const HOST = "https://api.github.com";

class Api {
  constructor(host = HOST) {
    this.host = host;
    this.request = request.defaults({
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.28.4",
      },
      json: true,
      rejectUnauthorized: false,
    });
  }

  searchRepositories(q, order, per_page) {
    //const path = `/search/repositories?q=${q}&order=${order}&per_page=${per_page}`;
    const path = `/search/repositories`;

    return this.request.get({
      url: `${this.host}${path}`,
      qs: {
        q,
        order,
        per_page,
      },
    });
  }

  getUserInfo(owner) {
    const path = `/users/${owner}`;

    return this.request.get({
      url: `${this.host}${path}`,
    });
  }
}

module.exports = Api;
