import http from "./routes/http-server";
import db from "./config/db-server";

async function start() {
    db.connectDataBase();
    http.runHttpServer();
}
start();
