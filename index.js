const express = require('express');
const posts = require('./posts/posts');

const port = 8000;

const server = express();
server.use(express.json());


server.use('/api/posts', posts)


server.get('/', (req,res) => {
    res.send("Hello to Web Api Project II")
})


server.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
})