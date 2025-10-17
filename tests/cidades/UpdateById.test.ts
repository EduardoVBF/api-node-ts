import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Update by id", () => {
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

  it("Tenta atualizar registro por id sem token de acesso", async () => {
    const res1 = await testServer.put("/cidades/1").send({
      nome: "Cidade Atualizada",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Atualizar registro por id", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Cidade de Teste",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizado = await testServer
      .put(`/cidades/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Cidade de Teste Atualizada",
      });
    expect(resAtualizado.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/cidades/999999999999999999999999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Cidade Inexistente",
      });
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it("Tentar atualizar sem informar o id", async () => {
    const res1 = await testServer
      .put("/cidades/")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Cidade Sem Id",
      });
    expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
