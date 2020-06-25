const User = require('../models/User');

const UserController = {    
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            res.send({user, message:'Usuario creado con éxito'})
        } catch (error) {
         console.error(error)   ;
         res.status(500).send({message:'Hubo un problema tratando de registrar al usuario', error})
        }
    }
};

module.exports = UserController;