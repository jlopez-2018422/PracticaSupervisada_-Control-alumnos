const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.cursoPath = '/api/cursos'
        this.authPath = '/api/auth'
        this.userPath = '/api/users'

        
        this.conectarDB();

        this.middlewares();

        this.routes();
        
    }
        
        async conectarDB(){
            await dbConection();
        }
        middlewares(){
            this.app.use(express.json());
            this.app.use(cors());
            this.app.use(express.static('public'));
        }
        routes(){
            this.app.use(this.cursoPath, require('../routes/curso'));
            this.app.use(this.authPath, require('../routes/auth'));
            this.app.use(this.userPath, require('../routes/user'));

        }
        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Servidor corriendo en puerto:  ${this.port}`);
            });
        }
        
}
module.exports = Server;