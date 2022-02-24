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
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true, //make this true
            autoIndex: true, //make this also true
        });
}
app.listen(process.env.PORT || 5500);