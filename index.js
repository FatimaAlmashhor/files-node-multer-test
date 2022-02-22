const express = require('express')
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/dashboard'))
app.listen(process.env.PORT || 5500);