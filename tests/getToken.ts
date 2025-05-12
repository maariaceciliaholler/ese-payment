import request from "supertest";

export async function getAuthToken() {
  const loginResponse = await request("http://localhost:8080")
    .post("/api/auth/login")
    .send({
      userEmail: "maria@email.com",
      userPassword: "senha123",
    });

  return loginResponse.body.token;
}