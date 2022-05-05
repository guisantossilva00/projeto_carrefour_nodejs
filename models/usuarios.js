const mongoose = require("../database/database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    data_nascimento: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    }
});

UserSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
});

const User = mongoose.model("usuarios", UserSchema);

 module.exports = User;