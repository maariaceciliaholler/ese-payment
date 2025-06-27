import SequelizeAdapter from "../src/config/db-server";

jest.mock("../src/middleware/auth.middleware", () => ({
  authMiddleware: (_req: any, _res: any, next: any) => next(),
}));

export async function setupDB() {
  await SequelizeAdapter.connectDataBase();
}

export async function closeDB() {
  if (SequelizeAdapter.instance) {
    await SequelizeAdapter.instance.close();
  }
}