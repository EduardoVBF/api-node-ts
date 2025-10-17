import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Pessoas - Update by id", () => {
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

  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Cidade teste",
      });
    cidadeId = resCidade.body;
  });

  it("Tentar atualizar registro sem token de acesso", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeUpdate@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Atualizar registro por id", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Pessoa de Teste",
        cidadeId: cidadeId,
        email: "testeUpdate@email.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer
      .put(`/pessoas/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Pessoa de Teste Atualizada",
        cidadeId: cidadeId,
        email: "teste.atualizado@email.com",
      });

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/pessoas/99999999999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Pessoa Inexistente",
        cidadeId: cidadeId,
        email: "teste.inexistente@email.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);

    expect(res1.body).toHaveProperty("errors.default");
  });
});
