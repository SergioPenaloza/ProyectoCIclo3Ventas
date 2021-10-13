const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.db_Connection);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a inicializar BD');
    }
} 

module.exports = {
    dbConnection
}

