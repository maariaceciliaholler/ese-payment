import { Router } from "express";
import paymentRoutes from "./payment/payment.routes"; 

const router = Router();

router.use("/api/payment", paymentRoutes);

export default router;
