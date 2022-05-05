const mongoose = require("../database/database");

const UserSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        unique: true,
        required: true
    },
    preco: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    quantidade: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("produtos", UserSchema);

 module.exports = User;