import axios from "axios";

type LoginResponse = {
  token: string;
};

export async function getValidToken(): Promise<string> {
  const response = await axios.post<LoginResponse>(
    "http://api-gateway:8080/api/auth/login",
    {
      userEmail: "mariaceciliaholler@gmail.com",
      userPassword: "senha123",
    }
  );

  return response.data.token;
}
