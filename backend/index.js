
const connecton = require("./db.js");
connecton();
const cors = require('cors')

const express = require('express');


const app = express();

app.use(cors())

const port = 3001;

// used to send or retreive data from body
app.use(express.json());


app.use("/user", require("./router/user"));
app.use("/note", require("./router/note"));


app.listen(port, () => {
  console.log(`http://localhost:${port}`);

});
