const jwt = require("jsonwebtoken")
const autentificacao = require("../config/autentificacao.json")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: "Token incorreto"});
    }

    const partes = authHeader.split(" ");

    if(!partes.length === 2){
        return res.status(401).send({error: "Token error"});
    }
    
    const [scheme, token] = partes;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: "Token não formatado"});
    }

    jwt.verify(token, autentificacao.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({error: "Token inválido"});
        }

        req.usuariosId = decoded.id;
        return next();
    });
};