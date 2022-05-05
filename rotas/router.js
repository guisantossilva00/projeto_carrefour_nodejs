const express = require("express");
const User = require("../models/usuarios");
const Produto = require("../models/produtos");
const router = express.Router();
const mongoose = require("mongoose");
const Produtos = mongoose.model("produtos")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const autentificacao = require("../config/autentificacao");
const { route } = require("express/lib/application");

function tokenGeral(params = {}){
    return jwt.sign(params, autentificacao.secret, {
        expiresIn: 86400,
    });
}

router.get("/", (req,res) =>{
    const nome = req.session.login
    Produtos.find({categoria: "smartphone"}).then((smartphone) =>{
        Produtos.find({categoria: "informatica"}).then((informatica) =>{
            Produtos.find({categoria: "tvs"}).then((tvs) =>{
                res.render("admin/index.handlebars", {smartphone: smartphone, informatica: informatica, tvs: tvs, nome: nome});
            }).catch((err) =>{
                req.flash("error_msg","Produto não encontrado" + err);
                return res.redirect("/");
            })
        })
    })
});

router.get("/sair", (req, res) => {
    req.session.destroy()
    res.redirect("/")
});

router.get("/cadastro", (req,res) =>{
    const nome = req.session.login
    res.render("admin/cadastro.handlebars", {nome: nome})
});

router.post("/cadastro", async (req, res) =>{
    const erros = [];
    
    const {email} = await req.body
    if (await User.findOne({email})){
       erros.push({texto: "Email existente"})
    }

    if (req.body.nome.length < 2){
       erros.push({texto: "Nome muito curto"});
    } 
    
    if(erros.length > 0) {
        res.render('admin/cadastro.handlebars', {erros: erros});
    } else {
        const usuarios = await {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            data_nascimento: req.body.data_nascimento
        }
        new User(usuarios).save().then(()=>{
            usuarios.senha = undefined;
            req.flash("success_msg", "Conta criada com sucesso!");
            return res.redirect("/cadastro");  
        }).catch((err) =>{
            req.flash("error_msg", "Houve um erro criar a conta, tente novamente");
            return res.redirect("/cadastro");
        });
    }
});

router.post("/login", async (req,res) =>{
    const {email, senha} = req.body;

    if(email == undefined || email == null || email == "" || senha == undefined || senha == null || senha == ""){
        req.flash("error_msg", "Usuario não cadastro");
        res.redirect("/");
    } else {
       const usuario = await User.findOne({email}).select("+senha");
      
       if(!usuario){
           req.flash("error_msg", "Usuario não cadastrado");
           res.redirect("/");
           return
        }
        const validarSenha = await bcrypt.compare(senha, usuario.senha)

        if(!validarSenha){
            req.flash("error_msg", "Email ou senha inválido");
            res.redirect("/");
        } else{
               usuario.senha = undefined;
               const {nome} = usuario
               
               req.session.login = nome;
           
               req.flash("success_msg", "Conta logada com sucesso!");
               return res.redirect("/"); 
           
       }
    }
});

router.post("/admin/produtos", async (req,res) => {
    const produtos = await {
        titulo: req.body.titulo,
        imagem: req.body.imagem,
        preco: req.body.preco,
        categoria: req.body.categoria,
        quantidade: req.body.quantidade,
    }
    new Produto(produtos).save().then(()=>{
        res.send("Produto salvo");
    }).catch((err) =>{
        res.status(400).send({error: "Erro ao cadastrar produto"});;
    });
});

router.get("/categoria/:categoria", async (req,res) => {
    const categoria = req.params.categoria
    const nome = req.session.login
    Produtos.find({categoria: categoria}).then((produtos)=>{
        res.render("admin/categorias.handlebars", {produtos: produtos, nome: nome});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listrar as categorias", + err);
        return res.redirect("/admin")
    })
});

router.get("/produtounico/:id", (req, res) =>{
    const nome = req.session.login
    Produtos.findOne({_id: req.params.id}).then((produtos) =>{
        res.render("admin/produtoUnico.handlebars", {produtos: produtos, nome: nome});
    }).catch((err) =>{
        req.flash("error_msg","Produto não encontrado" + err);
        return res.redirect("/");
    })
})

module.exports = app => app.use(router);