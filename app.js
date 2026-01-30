require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routers"));
app.use(require("./middlewares/errorHandler"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
