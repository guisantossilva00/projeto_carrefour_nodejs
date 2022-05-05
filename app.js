const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require('connect-flash');
const session = require('express-session');

app.use(session({
    // Chave para gerar uma sessão 
    secret: 'projetocarrefour',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require("./rotas/router")(app);
require("./rotas/projetoRouter")(app);

const hbs = handlebars.create({defaultLayout: "main", runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}});

app.engine("handlebars", hbs.engine);
app.set("views engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(8089, () => {
    console.log("Servidor rodando http://localhost:8089/");
});