
const connecton = require("./db.js");
connecton();

const express = require('express');
const app = express();

const port = 3000;

// used to send or retreive data from body
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/user", require("./router/user"));
app.use("/note", require("./router/note"));


app.listen(port, () => {
  console.log(`http://localhost:${port}`);

});
