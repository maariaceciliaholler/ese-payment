import { Request, Response } from "express";
import paymentService from "../../services/payment/payment.service";
import { TPaymentModel } from "../../models/payment/interfaces/Payment.model";

async function findAll(req: Request, res: Response): Promise<void> {
    try {
        const findAllResult = await paymentService.findAll();
        res.status(200).send(findAllResult);
    } catch (error) {
        console.error({ error });
        res.status(500).send(error);
    }
}

async function findOne(req: Request, res: Response): Promise<void> {
    try {
        const idToFind = req.params.id;
        const findOneResult = await paymentService.findOne(idToFind);
        res.status(200).send(findOneResult);
    } catch (error) {
        console.error({ error });
        res.status(500).send(error);
    }
}

async function create(req: Request<{}, {}, TPaymentModel>, res: Response): Promise<void> {
    try {
        const body = req.body;
        const createResult = await paymentService.create(body);
        res.status(201).send(createResult);
    } catch (error) {
        console.error({ error });
        res.status(500).send(error);
    }
}

async function createPayment(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).send("Token ausente");
      return;
    }
    const token = authHeader.split(" ")[1];

    const body = req.body;
    const paymentResult = await paymentService.createPaymentUsecase(
      body,
      token
    );

    res.status(201).send(paymentResult);
  } catch (error) {
    console.error({ error });
    res.status(500).send(error);
  }
}


async function update(req: Request, res: Response): Promise<void> {
    try {
        const body = req.body;
        const updateResult = await paymentService.update(body);
        res.status(204).send(updateResult);
    } catch (error) {
        console.error({ error });
        res.status(500).send(error);
    }
}

async function deleteOne(req: Request, res: Response): Promise<void> {
    try {
        const idToFind = req.params.id;
        const deleteResult = await paymentService.deleteOne(idToFind);

        if (deleteResult) {
            res.status(204).send("");
            return;
        }

        res.status(400).send("Não foi possível excluir o pagamento");
    } catch (error) {
        console.error({ error });
        res.status(500).send(error);
    }
}

const PaymentController = {
    findAll,
    findOne,
    create,
    createPayment,
    update,
    deleteOne,
};

export default PaymentController;
