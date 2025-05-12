import app from "./app";
import db from "./config/db-server";

async function start() {
    await db.connectDataBase();
    const PORT = process.env.PAYMENT_APP_PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Payment service running on port ${PORT}`);
    });
}

start();