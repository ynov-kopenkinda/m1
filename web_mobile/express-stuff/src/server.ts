// Une clé API est partagée entre votre API et le serveur distant (Postman quoi)
// Cette clé est fournie par le client dans le Header "X-YBook-API-Key"
// L'utilisateur de la clé est passé dans le Header "X-YBook-API-User
// Le middleware doit valider l'exactitude de la correspondance user/key et autoriser où non la poursuite de la requête

import express, {
    type ErrorRequestHandler
} from "express";
import AuthMiddleware from "./middlewares/auth";

const app = express();

app.get("/", AuthMiddleware, (req, res) => {
  res.send(res.locals.user);
});

app.use(((err, req, res, next) => {
  res.status(err.status ?? 500).send(err.message ?? "Internal Server Error");
}) as ErrorRequestHandler);

app.listen(3333, () => {
  console.log("Server started on port 3333!");
});
