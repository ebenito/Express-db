const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'Debe de introducir un email'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role:{
        type:String,
        default:'user',
        enum:['admin','user','guest']
    },
    token:Object
},{
    toJSON:{
        transform:function (doc,ret) {  //sobrescribe el método toJSON para eliminar la password de los resultados, para mantener la confidencialidad
            //ret.password = undefined;
            delete ret.password;
            return ret;
        },
        virtuals:true //para que muestre los campos virtuales que se definen más abajo
    },
    toObject:{  //sobrescribe el método toObject para habilitar las modificados de los resultados al manejar el objecto dentro de la app, por ejemplo al hacer console.log(user) dentro de algún método.        
        virtuals:true
    }
});

UserSchema.virtual('role-email').get(function() {  //Añade campos calculados en tiempo de ejecución
    const user = this;
    return {
        role: user.role,
        email: user.email
    }
});

UserSchema.virtual('role-name').get(function() {  
    const user = this;
    let name;
    if (user.name == '' || typeof(user.name) == 'undefined') { name = 'Sin nombre'} else { name = user.name};
    return  user.role + ' | ' + name;
});

//Vamos a encriptar la contraseña para guardarla encriptada con bcrypt
UserSchema.pre('save', async function(next){  //Middelwares: pre = acciones previas a la operación (save); también hay post para las posteriores
    try {
        const user = this;
        // let pass = user.password;
        // console.log(pass);

        // const salt = await bcrypt.genSalt(9); //normalmente entre 9 y 10 rondas de salt (que hacen más impredicible el hash)
        // console.log(salt);

        // const hash = await bcrypt.hash(pass,salt);
        // console.log(hash);

        // pass = hash;

        user.password = await bcrypt.hash(user.password, 9); //Lo anterior se condensa en esta linea
        user.token = await user.generateAuthToken();
        next();
    } catch (error) {
        console.error(error);
    };    
});

// Crearemos un método para la creación de un token a un usuario en concreto, ya que este
// método se tiene que llamar directamente desde un documento que hayamos recogido
// previamente.
UserSchema.methods.generateAuthToken = function () {
    const user = this
    const access = "auth"
    const token = jwt.sign({ _id: user._id }, "secretJsonwebtokens")
    // return this.update({
    //     $push: {
    //         tokens: token,
    // },
    //})
    return token
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
