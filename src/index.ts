import { Knex } from "./server/database/knex/index.js";
import { server } from "./server/server.js";
import "express";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log("****************** OIIIIIIIIIII ******************");
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 3333}`
    );
  });
};

if (process.env.IS_LOCALHOST !== "true") {
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
