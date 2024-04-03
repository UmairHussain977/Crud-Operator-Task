const express = require('express')
const app = express()
const { mongoose } = require('./config')
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const PORT = 4000

var db = mongoose.connection
db.on('error', (error) => {
    console.log('error', error)
})
db.on('open', () => {
    console.log('DB running')
})

app.use(express.json())
app.use('/api', require('./routes'))

app.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`)
})