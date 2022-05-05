const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/carrefour").then(()=>{
    console.log("Conectado ao mongoDB")
}).catch((err)=>{
    console.log("erro ao se conectar: " + err);
});
mongoose.Promise = global.Promise; 

module.exports = mongoose;