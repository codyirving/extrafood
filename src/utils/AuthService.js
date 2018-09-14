import decode from "jwt-decode";

import auth0 from "auth0-js";

const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

const CLIENT_ID = "4n0WRpvfn6i5Iwpfy01hgkaDrdLZVs3y";
const CLIENT_DOMAIN = "codyi.auth0.com";
const REDIRECT = "http://extrafood.codyi.mobi/callback";
const SCOPE = "openid profile";
const AUDIENCE = "extrafoodAPI.codyi.mobi";

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: "token id_token",
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  window.location = "/";
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: "/" });
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function getManagementToken() {
  var options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: `"{"client_id":"XxtalDRLZ8EMR9YsI8qcW3fiCe3g1ZOu","client_secret":${
      process.env.CLIENT_SECRET
    },"audience":"https://codyi.auth0.com/api/v2/","grant_type":"client_credentials"}"`
  };

  return await fetch("https://codyi.auth0.com/oauth/token", options)
    .then(res => res.json())
    .then(resJson => {
      console.log("resJson", resJson);
      return resJson.access_token;
    })
    .catch(err => console.log("Error", err));
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName("access_token");
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName("id_token");
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  let token;
  if (encodedToken) {
    token = decode(encodedToken);
  }
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
