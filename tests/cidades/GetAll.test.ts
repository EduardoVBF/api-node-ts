import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe ("Cidades - GetAll", () => {
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

  it("Tenta buscar todos os registros de cidades sem token de acesso", async () => {
    const res1 = await testServer.get("/cidades").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Buscar todos os registros de cidades", async () => {
    const res1 = await testServer.post("/cidades").set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: "São Paulo",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBusca = await testServer.get("/cidades").set({ Authorization: `Bearer ${accessToken}` }).send();

    expect(Number(resBusca.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBusca.statusCode).toEqual(StatusCodes.OK);
    expect(resBusca.body).toBeInstanceOf(Array);
    expect(resBusca.body.length).toBeGreaterThan(0);
  });
});