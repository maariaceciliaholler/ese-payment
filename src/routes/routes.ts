import { Router } from "express";
import quotationRoutes from "./quotation/quotation.routes";
import paymentRoutes from "./payment/payment.routes"; 

const router = Router();

router.use("/api/quotation", quotationRoutes);
router.use("/api/payment", paymentRoutes);

export default router;
