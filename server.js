const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server running. Use our API on port: ${PORT}`
      );
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
