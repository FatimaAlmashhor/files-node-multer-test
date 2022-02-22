const express = require('express')
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded())

app.listen(process.env.PORT || 5000);