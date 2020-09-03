const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoute = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoute);

app.listen(PORT, () => console.log(`My server is running on PORT: ${PORT}`));
