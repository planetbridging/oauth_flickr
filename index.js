const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const request = require("request");

function hash_function_sha1(base_string, key) {
  return crypto.createHmac("sha1", key).update(base_string).digest("base64");
}

const oauth = OAuth({
  consumer: {
    key: "99872428c9a3629cc7186481eebd04fd",
    secret: "3805e33e71aa0435",
  },
  signature_method: "HMAC-SHA1",
  hash_function: hash_function_sha1,
});

const request_data = {
  url: "https://www.flickr.com/services/oauth/request_token",
  method: "POST",
  data: {
    oauth_callback: "http://example.com",
  },
};

request(
  {
    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data),
  },
  function (error, response, body) {
    // Process your data here
    console.log(response);
    console.log("---------");
    console.log(body);
  }
);
