import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Delete", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-usuario-delete@gmail.com";

    await testServer.post("/cadastrar").send({
      nome: "Create Usuario",
      email,
      senha: "123456",
    });

    const signInRes = await testServer.post("/entrar").send({
      email,
      senha: "123456",
    });

    accessToken = signInRes.body.accessToken;
  });

  it("Tenta apagar registro de cidade sem token de acesso", async () => {
    const teste1 = await testServer.delete("/cidades/1").send();

    expect(teste1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(teste1.body).toHaveProperty("errors.default");
  });

  it("Apaga registro de cidade", async () => {
    const teste1 = await testServer.post("/cidades").set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: "São Paulo",
    });
    expect(teste1.statusCode).toEqual(StatusCodes.CREATED);

    const testeApagar1 = await testServer.delete(`/cidades/${teste1.body}`).set({ Authorization: `Bearer ${accessToken}` }).send();

    expect(testeApagar1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta apagar registro que não existe", async () => {
    const teste1 = await testServer.delete("/cidades/99999").set({ Authorization: `Bearer ${accessToken}` }).send();

    expect(teste1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(teste1.body).toHaveProperty("errors.default");
  });
});
