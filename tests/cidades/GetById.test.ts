import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Get by id", () => {
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

  it("Tenta buscar registro por id sem token de acesso", async () => {
    const res1 = await testServer.get("/cidades/1").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Buscar registro por id", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Cidade de Teste",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscado = await testServer
      .get(`/cidades/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(resBuscado.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscado.body).toEqual(
      expect.objectContaining({
        id: res1.body,
        nome: "Cidade de Teste",
      })
    );
  });

  it("Tentar buscar registro que não existe", async () => {
    const res1 = await testServer
      .get("/cidades/999999999999999999999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
