const express =require("express");
const routes=require('./singup');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use("/user",routes)
app.get('/', (req, res) => {
  res.send("Hello World");
});
app.listen(3000, () => {
  console.log(`Server is listening on port`);
});
