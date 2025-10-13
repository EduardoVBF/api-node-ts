import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe ("Cidades - GetAll", () => {
  it("Buscar todos os registros de cidades", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBusca = await testServer.get("/cidades");

    expect(Number(resBusca.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBusca.statusCode).toEqual(StatusCodes.OK);
    expect(resBusca.body).toBeInstanceOf(Array);
    expect(resBusca.body.length).toBeGreaterThan(0);
  });
});