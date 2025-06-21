import { Router } from "express";
import PaymentController from "../../controllers/payment/payment.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const paymentRoutes = Router();

paymentRoutes.post("/create", authMiddleware, PaymentController.createPayment);
paymentRoutes.post("/", authMiddleware, PaymentController.create);
paymentRoutes.get("/", authMiddleware, PaymentController.findAll);
paymentRoutes.get("/:id", authMiddleware, PaymentController.findOne);
paymentRoutes.put("/:id", authMiddleware, PaymentController.update);
paymentRoutes.delete("/:id", authMiddleware, PaymentController.deleteOne);


export default paymentRoutes;
