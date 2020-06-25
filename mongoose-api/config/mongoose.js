const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose-api', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex: true,
 useFindAndModify: false
})
.then(()=> console.log('Conectado con éxito a MongoDB'))
.catch(console.error);

module.exports = mongoose;