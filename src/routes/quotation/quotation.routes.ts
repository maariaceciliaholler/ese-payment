import { Router } from 'express';
import QuotationController from "../../controllers/quotation/quotation.controller";

const quotationRoutes = Router();

// Rotas POST
quotationRoutes.post("/quotation-with-addresses", QuotationController.createWithAddresses);

// Rotas GET
quotationRoutes.get("/quotation", QuotationController.findAll);
quotationRoutes.get("/quotation/:id", QuotationController.findOne);
quotationRoutes.get("/quotation-by-cpf/:cpf", QuotationController.findAllByCPF);
quotationRoutes.get("/quotation-no-offers", QuotationController.findAllWithoutApprovedOffers);

// // Rotas PUT e DELETE
quotationRoutes.put("/quotation/:id", QuotationController.update);
quotationRoutes.delete("/quotation/:id", QuotationController.deleteOne);

export default quotationRoutes;