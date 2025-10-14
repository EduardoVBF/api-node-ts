import "express";
import { server } from "./server/server.js"; // Revertendo para incluir a extensão .js

server.listen(process.env.PORT || 3333, () => {
    console.log("****************** OIIIIIIIIIII ******************");
    console.log(`Server is running on http://localhost:${process.env.PORT || 3333}`);
});