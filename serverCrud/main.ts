import { app } from "./app.js";

// Designate which PORT the server will listen on
const rawPort = Number(process.env.PORT);
const PORT = Number.isFinite(rawPort) ? rawPort : 4001;

// listen on the designated PORT
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
