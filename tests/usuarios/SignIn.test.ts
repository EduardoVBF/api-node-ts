import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Usuário - SignIn (login)", () => {
  beforeAll(async () => {
    await testServer.post("/cadastrar").send({
      nome: "Usuário Login",
      email: "usuario_login@example.com",
      senha: "senhaLogin123",
    });
  });

  it("Faz login com usuário cadastrado", async () => {
    const res = await testServer.post("/entrar").send({
      email: "usuario_login@example.com",
      senha: "senhaLogin123",
    });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("Tenta fazer login com senha errada", async () => {
    const res = await testServer.post("/entrar").send({
      email: "usuario_login@example.com",
      senha: "senhaErrada123",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Tenta fazer login com email não cadastrado", async () => {
    const res = await testServer.post("/entrar").send({
      email: "email_inexistente@example.com",
      senha: "senhaQualquer123",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Tenta fazer login com email de formato inválido", async () => {
    const res = await testServer.post("/entrar").send({
      email: "email_invalido",
      senha: "senhaQualquer123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta fazer login com senha muito curta", async () => {
    const res = await testServer.post("/entrar").send({
      email: "usuario_login@example.com",
      senha: "123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("Tenta fazer login sem informar a senha", async () => {
    const res = await testServer.post("/entrar").send({
      email: "usuario_login@example.com",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("Tenta fazer login sem informar o email", async () => {
    const res = await testServer.post("/entrar").send({
      senha: "senhaLogin123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta fazer login sem informar nada", async () => {
    const res = await testServer.post("/entrar").send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
    expect(res.body).toHaveProperty("errors.body.senha");
  });
});