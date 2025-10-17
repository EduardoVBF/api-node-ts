import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Create", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-usuario@gmail.com";

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

  it("Tenta criar registro de cidade sem token de acesso", async () => {
    const teste1 = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    expect(teste1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(teste1.body).toHaveProperty("errors.default");
  });

  it("Criar registro de cidade", async () => {
    const teste1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "São Paulo",
      });

    expect(teste1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof teste1.body).toEqual("number");
  });

  it("Tenta criar registro de cidade com nome curto", async () => {
    const teste1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "S",
      });

    expect(teste1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(teste1.body).toHaveProperty("errors.body.nome");
  });
});
