# Dashboard Backend

---

## About

The BE service to provide the currency and country data to the FE dashboard. The service handles simple auth using JWT and rate-limitting for the requests as well. Express is used for serving the requests and Apollo GraphQL for enabling the GraphQL layer.

---

## Running locally

- Set the values for the following environment variables in a `.env` file at the project root dir.

```
SERVER_PORT=<PORT for the server to run on (Optional)>
JWT_SECRET=<Secret to be used for signing the JWT access tokens>
CURRENCY_API_KEY=<API Key for accessing the Fixer currency APIs>
```

- Execute the script `yarn run:dev`

---

## Postman Collection

https://www.getpostman.com/collections/d3b099fb49ed7227476c
