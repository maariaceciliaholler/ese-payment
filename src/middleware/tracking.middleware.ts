export async function updateDeliveryProcessMiddleware(
  id: number | string,
  partialPayload: Record<string, any>,   
  token: string
) {
  const response = await fetch(
    `http://api-gateway:8080/delivery/${id}`,
    {
      method: "PUT",                       
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(partialPayload),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Falha ao atualizar delivery process ${id}: ${await response.text()}`
    );
  }
  return await response.json();
}