import { Router } from "express";
import PaymentController from "../../controllers/payment/payment.controller";

const paymentRoutes = Router();

// Rotas POST
paymentRoutes.post("/", PaymentController.create);
paymentRoutes.post("/create", PaymentController.createPayment);

// Rotas GET
paymentRoutes.get("/", PaymentController.findAll);
paymentRoutes.get("/:id", PaymentController.findOne);

// Rotas PUT e DELETE
paymentRoutes.put("/:id", PaymentController.update);
paymentRoutes.delete("/:id", PaymentController.deleteOne);

export default paymentRoutes;
