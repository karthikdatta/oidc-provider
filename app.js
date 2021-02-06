const express = require("express");
const Provider = require("oidc-provider");
const helmet = require("helmet");
const https = require("https");
const fs = require("fs");

var key = fs.readFileSync("cert/selfsigned.key");
var cert = fs.readFileSync("cert/selfsigned.crt");
var credentials = {
  key: key,
  cert: cert,
};
const app = express();
app.use(helmet());

const configuration = {
  claims: {
    email: ["email", "email_verified"],
    phone: ["phone_number", "phone_number_verified"],
    profile: [
      "birthdate",
      "family_name",
      "gender",
      "given_name",
      "locale",
      "middle_name",
      "name",
      "nickname",
      "picture",
      "preferred_username",
      "profile",
      "updated_at",
      "website",
      "zoneinfo",
    ],
  },
  clients: [
    {
      issuer: "https://localhost",
      client_id: "54845158455dsd4sad5sd4sa8d4s5454sda",
      client_secret: "super_secret",
      grant_types: ["implicit"],
      redirect_uris: ["https://google.com"],
      response_types: ["id_token"],
    },
  ],
  features: {
    clientCredentials: { enabled: true },
    introspection: { enabled: true },
  },
  ttl: {
    AccessToken: 1 * 60 * 60, // 1 hour in seconds
    AuthorizationCode: 10 * 60, // 10 minutes in seconds
    IdToken: 1 * 60 * 60, // 1 hour in seconds
    DeviceCode: 10 * 60, // 10 minutes in seconds
    RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
  },
};

//Creating oidc provider instance
const oidc = new Provider("http://localhost", configuration);

app.enable("trust proxy");
Provider.proxy = true;

app.use(oidc.callback);

// oidc.listen(3000, () => {
//   console.log(
//     "oidc-provider listening on port 3000, check https://localhost:3000/.well-known/openid-configuration"
//   );
// });
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log(
    `application is listening on port 443, check https://localhost/.well-known/openid-configuration`
  );
});
