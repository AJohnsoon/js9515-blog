const server = require('./conn');

server.listen(3000, (err)=>{
    if(err)
        return console.log(err)
    console.log('Server is running in port 3000')
})
