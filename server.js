const express = require("express");
const express_graphql = require("express-graphql");
const schema = require("./schema");
const { rootResolver } = require("./resolvers");
const app = express();
const cors = require("cors");

app.use(
  "/graphql",
  cors(),
  express_graphql({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true
  })
);
app.listen(4000, () =>
  console.log("Server Now Running On localhost:4000/graphql")
);
