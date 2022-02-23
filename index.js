const express = require('express')
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/dashboard'))


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/portfolio',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
}
app.listen(process.env.PORT || 5500);