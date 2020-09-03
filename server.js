const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoute = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use("/api", apiRoute);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  

app.listen(PORT, () => console.log(`My server is running on PORT: ${PORT}`));
