const mongoose = require('mongoose');
const URL = 'mongodb://127.0.0.1:27017/mm'

mongoose.connect(URL)
        .then(() => console.log('MongoDB connected hogya'))
        .catch((error) => console.log(error))
