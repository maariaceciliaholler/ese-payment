import SequelizeAdapter from "../config/db-server";

jest.mock("../middleware/checkAuth.ts", () => ({
  checkAuth: (_req: any, _res: any, next: any) => next()
}));

export async function setupDB() {
  await SequelizeAdapter.connectDataBase();
}

export async function closeDB() {
  if (SequelizeAdapter.instance) {
    await SequelizeAdapter.instance.close();
  }
}