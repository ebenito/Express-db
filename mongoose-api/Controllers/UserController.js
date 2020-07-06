const User = require('../models/User');

const UserController = {    
    async getAll(req,res) {
        try {
            const users = await User.find()
            res.send(users);            
        } catch (error) {
            console.error(error)   ;
            res.status(500).send({message:'Hubo un problema tratando de obtener el listado de usuarios', error})
        }
    },
    async getById(req,res) {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(204).send(); //No content 
            }
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({message:'Hubo un problema tratando de consultar el usuario con id: ' + req.params.id, error})
        }        
    },
    async getByEmail(req,res) {
        try {
            const user = await User.findOne({email:req.params.email})
            if (!user) {
                return res.status(204).send();
            }
            //console.log(user);
            res.send(user);
        } catch (error) {
            console.error(error)   ;
            res.status(500).send({message:'Hubo un problema tratando de consultar el usuario con email: ' + req.params.email, error})
        }        
    },    
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            //const token = await user.generateAuthToken();
            //console.log(token);
            res.send({user, message:'Usuario creado con éxito'})
        } catch (error) {
            console.error(error)   ;
            res.status(500).send({message:'Hubo un problema tratando de registrar al usuario', error})
        }
    },
    async update(req,res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true}) //con new:true indicamos que nos devuelva el registro actualizado, sino nos devolvera el registro original
            if (!user) {
                return res.status(204).send(); //No content 
            }
            //console.log(req.params.id, req.body);
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({message:'Hubo un problema tratando de actualizar el usuario con id: ' + req.params.id, error})
        }        
    },
    async delete(req,res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id, req.body) 
            if (!user) {
                return res.status(204).send(); //No content 
            }
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({message:'Hubo un problema tratando de eliminar el usuario con id: ' + req.params.id, error})
        }        
    }
};

module.exports = UserController;