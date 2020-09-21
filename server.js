const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoute = require("./routes/apiRoutes");
const path = require("path");
const db = require("./model");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoute);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
      });
}
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
