const express = require("express");
const Provider = require("oidc-provider");

const app = express();

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
      client_id: "test_oauth_app",
      client_secret: "super_secret",
      grant_types: ["client_credentials"],
      redirect_uris: [],
      response_types: [],
    },
  ],
  features: {
    clientCredentials: { enabled: true },
    introspection: { enabled: true },
  },
};
//Creating oidc provider instance
const oidc = new Provider("http://localhost:3000", configuration);

oidc.callback;

const server = oidc.listen(3000, () => {
  console.log(
    "oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration"
  );
});
