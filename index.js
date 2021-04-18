const server = require('./router');

server.listen(3000, (err)=>{
    if(err)
        return console.log(err)
    console.log('server is running')
})
