const app = require('./router');
const connection = require('./database/data');

connection.authenticate().then(() =>{
    console.log('Connection success with database js9515')
}).catch((err)=>{
    console.log(err, 'error to connecting database')
})

module.exports = app