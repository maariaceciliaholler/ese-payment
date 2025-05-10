import { Router } from "express";
import PaymentController from "../../controllers/payment/payment.controller";
import { checkAuth } from "../../middleware/checkAuth";

const paymentRoutes = Router();

paymentRoutes.post("/create", checkAuth, PaymentController.createPayment);
paymentRoutes.post("/", checkAuth, PaymentController.create);
paymentRoutes.get("/", checkAuth, PaymentController.findAll);
paymentRoutes.get("/:id", checkAuth, PaymentController.findOne);
paymentRoutes.put("/:id", checkAuth, PaymentController.update);
paymentRoutes.delete("/:id", checkAuth, PaymentController.deleteOne);

export default paymentRoutes;
