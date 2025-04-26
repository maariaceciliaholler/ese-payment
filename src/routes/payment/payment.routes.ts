import { Router } from "express";
import PaymentController from "../../controllers/payment/payment.controller";

const paymentRoutes = Router();

// Rotas POST
paymentRoutes.post("/create", PaymentController.createPayment);
paymentRoutes.post("/", PaymentController.create);

// Rotas GET
paymentRoutes.get("/", PaymentController.findAll);
paymentRoutes.get("/:id", PaymentController.findOne);

// Rotas PUT e DELETE
paymentRoutes.put("/:id", PaymentController.update);
paymentRoutes.delete("/:id", PaymentController.deleteOne);

export default paymentRoutes;
