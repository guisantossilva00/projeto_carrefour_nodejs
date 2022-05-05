$('.carrosel-card').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    revArrow: "#botao-prev",
    nextArrow: "#next",
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
});

const toggle = document.getElementById('toggle');
toggle.onclick = function(){
    toggle.classList.toggle('active');
}

window.onscroll = function(){
    fixedHeader();
}

function fixedHeader() {
    const fixedHeader = document.getElementById("fixedHeader");
    const fixedHeaderRespo = document.getElementById("fixedHeaderResponsivo");
    const menuLinksHeaderRespo = document.getElementById("header-menu");
    if (document.documentElement.scrollTop > 50){
        fixedHeader.classList.add("fixedHeader");
        fixedHeaderRespo.classList.add("fixedHeader");
        toggle.classList.add("toggle")
        menuLinksHeaderRespo.classList.add("header-menu")
    } else {
        fixedHeader.classList.remove("fixedHeader");
        fixedHeaderRespo.classList.remove("fixedHeader");
        toggle.classList.remove("toggle")
        menuLinksHeaderRespo.classList.remove("header-menu")
    }
}

function iniciaModal(id){
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.add("mostrar-modal-login");
        modal.addEventListener("click", (evento) =>{
            if(evento.target.id == id || evento.target.id == "fechar-modal") {
                modal.classList.remove("mostrar-modal-login");
            }
        });
    }
}

const login = document.getElementById("login");
login.addEventListener("click", () =>{
    iniciaModal('modal-login');
});

function validarCadastro(){
  const nome = document.getElementById("nome");
  const nome_erro = document.getElementById("erroNome")

  const email = document.getElementById("email");
  const email_erro = document.getElementById("erroEmail")

  const senha = document.getElementById("senha");
  const senha_erro = document.getElementById("erroSenha")

  const data = document.getElementById("data_nascimento");
  const data_erro = document.getElementById("erroData")

  if(nome.value == "" || nome.value == null || nome.value == undefined){
    nome.classList.add('erro');
    nome_erro.classList.add('mostrar_erro');
    nome.focus();
    return false;
  } else {
    nome.classList.remove("erro");
    nome_erro.classList.remove("mostrar_erro");
  }

  if(email.value == "" || email.value == null || email.value == undefined){
    email.classList.add('erro');
    email_erro.classList.add('mostrar_erro');
    email.focus();
    return false;
  } else {
    email.classList.remove("erro");
    email_erro.classList.remove("mostrar_erro");
  }

  if(senha.value == "" || senha.value == null || senha.value == undefined){
    senha.classList.add('erro');
    senha_erro.classList.add('mostrar_erro');
    senha.focus();
    return false;
  } else {
    senha.classList.remove("erro");
    senha_erro.classList.remove("mostrar_erro");
  }

  if(data.value == "" || data.value == null || data.value == undefined){
    data.classList.add('erro');
    data_erro.classList.add('mostrar_erro');
    data.focus();
    return false;
  } else {
    data.classList.remove("erro");
    data_erro.classList.remove("mostrar_erro");
  }
}

function validarLogin(){

  const email = document.getElementById("email_login");
  const email_erro = document.getElementById("erroEmailLogin")

  const senha = document.getElementById("senha_login");
  const senha_erro = document.getElementById("erroSenhaLogin")



  if(email.value == "" || email.value == null || email.value == undefined){
    email.classList.add('erro');
    email_erro.classList.add('mostrar_erro');
    email.focus();
    return false;
  } else {
    email.classList.remove("erro");
    email_erro.classList.remove("mostrar_erro");
  }

  if(senha.value == "" || senha.value == null || senha.value == undefined){
    senha.classList.add('erro');
    senha_erro.classList.add('mostrar_erro');
    senha.focus();
    return false;
  } else {
    senha.classList.remove("erro");
    senha_erro.classList.remove("mostrar_erro");
  }
}