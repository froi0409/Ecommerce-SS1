import { app } from "./app.js";

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

