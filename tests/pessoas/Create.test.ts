import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Pessoas - Create", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "Cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Criar registro de pessoa", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "teste@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toEqual(expect.any(Number));
  });

  it("Criar registro 2 de pessoa", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste 2",
      cidadeId: cidadeId,
      email: "teste2@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toEqual(expect.any(Number));
  });

  it("Tentar criar registro de pessoa com email duplicado", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeduplicado@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toEqual(expect.any(Number));

    const res2 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Email Duplicado",
      cidadeId: cidadeId,
      email: "testeduplicado@email.com",
    });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });

  it("Tentar criar registro de pessoa com nomeCompleto muito curto", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pe",
      cidadeId: cidadeId,
      email: "teste@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });

  it("Tentar criar registro de pessoa sem nomeCompleto", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId: cidadeId,
      email: "teste@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });

  it("Tentar criar registro de pessoa sem email", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("Tentar criar registro com email inválido", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeemail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("Tentar criar registro de pessoa sem cidadeId", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      email: "teste@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
  });

  it("Tentar criar registro de pessoa com cidadeId inválido", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: "a",
      email: "teste@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
  });

  it("Tentar criar registro de pessoa com dados inválidos", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pe",
      cidadeId: "a",
      email: "testeemail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");

    expect(res1.body).toHaveProperty("errors.body.cidadeId");

    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("Tentar criar registro de pessoa sem enviar dados", async () => {
    const res1 = await testServer.post("/pessoas").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
    expect(res1.body).toHaveProperty("errors.body.email");
  });
});
