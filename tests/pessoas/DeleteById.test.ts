import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Pessoas - DeleteById", () => {
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

  it("Tentar apagar registro sem token de acesso", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeDelete@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Apaga registro de pessoa", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Pessoa de Teste",
        cidadeId: cidadeId,
        email: "testeDelete@email.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer
      .delete(`/pessoas/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar apagar registro que não existe", async () => {
    const res1 = await testServer
      .delete("/pessoas/999999999999999999999")
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);

    expect(res1.body).toHaveProperty("errors.default");
  });
});
