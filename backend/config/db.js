const mongoose = require('mongoose')
const uri = 'mongodb+srv://manzoorumair11:umair@cluster0.zpfon3m.mongodb.net/'

mongoose.connect(uri,
    {useNewUrlParser: true,
    useUnifiedTopology: true}
)


module.exports = mongoose