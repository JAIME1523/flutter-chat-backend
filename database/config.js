const mongoose = require('mongoose');

const dbconection = async () => {
    try {
        //coneccion con la base dedatos 
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('dbONline');


    } catch (e) {
        console.log(e.msg);
        throw new Error('Error en la base de datos');
    }
}

module.exports = { dbconection }