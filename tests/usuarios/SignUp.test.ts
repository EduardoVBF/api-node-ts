import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Usuário - SignUp", () => {
  it("Cadastra usuário 1", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "Usuário 1",
      email: "usuario1@example.com",
      senha: "senha123",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Cadastra usuário 2", async () => {
    const res2 = await testServer.post("/cadastrar").send({
      nome: "Usuário 2",
      email: "usuario2@example.com",
      senha: "senha123456",
    });

    expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res2.body).toEqual("number");
  });

  it("Tenta cadastrar usuário com email já existente", async () => {
    const res = await testServer.post("/cadastrar").send({
      nome: "Usuário 1",
      email: "usuario1duplicado@example.com",
      senha: "senha123",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");

    const resConflict = await testServer.post("/cadastrar").send({
      nome: "Usuário 1 duplicado",
      email: "usuario1duplicado@example.com",
      senha: "senha123",
    });

    expect(resConflict.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resConflict.body).toHaveProperty("errors.default");
  });

  it("Tenta cadastrar usuário sem email", async () => {
    const res = await testServer.post("/cadastrar").send({
      nome: "Usuário Sem Email",
      senha: "senha123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta cadastrar usuário sem nome", async () => {
    const res = await testServer.post("/cadastrar").send({
      email: "usuario_sem_nome@example.com",
      senha: "senha123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("Tenta cadastrar usuário sem senha", async () => {
    const res = await testServer.post("/cadastrar").send({
      nome: "Usuário Sem Senha",
      email: "usuario_sem_senha@example.com",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("Tenta cadastrar usuário com email inválido", async () => {
    const res = await testServer.post("/cadastrar").send({
      nome: "Usuário Email Inválido",
      email: "email_invalido",
      senha: "senha123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta cadastrar usuário com senha inválida (pequena)", async () => {
    const res = await testServer.post("/cadastrar").send({
      nome: "Usuário Senha Inválida",
      email: "usuario_senha_invalida@example.com",
      senha: "123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("Tenta cadastrar usuário com nome inválido (pequeno)", async () => {
    const res = await testServer.post("/cadastrar").send({
      nome: "Us",
      email: "usuario_nome_invalido@example.com",
      senha: "senha123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("Tenta cadastrar usuário sem nenhum dado", async () => {
    const res = await testServer.post("/cadastrar").send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
    expect(res.body).toHaveProperty("errors.body.email");
    expect(res.body).toHaveProperty("errors.body.senha");
  });
});
