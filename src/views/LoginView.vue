<template>
<div class="wrapper fadeInDown">
    <div id="formContent">
        <!-- Tabs Titles -->

        <h1 class="glow">Financial Health</h1>
        <p><i>demo</i></p>

        <!-- Icon -->
        <div class="fadeIn first">
            <img src="../assets/logo_enter.png" id="icon" alt="User Icon" />
        </div>

        <!-- Login Form -->
        <form>
            <input type="text" id="login" class="fadeIn second" name="login" v-model="user.login" placeholder="login">
            <input type="text" id="password" class="fadeIn third" name="login" v-model="user.password" placeholder="password">

            <input type="button" class="btn-primary" v-on:click="login()" :disabled="verifyLoginPassword()" value="Logar" />
            <input type="button" class="btn-secundary" v-on:click="openModalCadastro('abrir')" value="cadastrar" />
        </form>

        <!-- Remind Passowrd 
            <div id="formFooter">
              <a class="underlineHover" href="#">Forgot Password?</a>
            </div>
            -->

    </div>
</div>

<LoginError />

<!-- The Modal -->
<div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-header">
            <span class="close" v-on:click="openModalCadastro('fechar')">&times;</span>
            <h2 class="modalh2">Cadastrar novo usuário</h2>
        </div>
        <div class="modal-body">
            <form>
                <input type="text" class="register" id="nomeRegister" name="nomeRegister" v-model="registerUser.name" placeholder="nome">
                <input type="text" class="register" id="loginRegister" name="loginRegister" v-model="registerUser.login" placeholder="login">
                <input type="text" class="register" id="passwordRegister" name="passwordRegister" v-model="registerUser.password" placeholder="password">
                <input type="text" class="register" id="passwordConfirm" name="passwordConfirm" v-model="registerUser.passwordConfirm" placeholder="confirmar password">
            </form>
        </div>
        <div class="modal-footer">
            <input type="button" class="btn-secundary" v-on:click="realizarCadastro()" value="ok" />
        </div>
    </div>

</div>
</template>

<script>
import http from "../http-commons"
import LoginError from "@/components/LoginError.vue"

export default {

    name: 'LoginPage',
    components: {
        LoginError,
    },

    data() {
        return {
            user: {
                login: "danilo@testenovo.com",
                password: "123456"
            },
            registerUser: {
                name: "",
                login: "",
                password: "",
                passwordConfirm: ""
            },
            viewModal: false
        }
    },

    beforeMount() {
        console.log("Validar se está conectado no beforeMount() - Login")

        // verifica se tem token no local storage e tenta acessar os dados da api
        if (localStorage.getItem("tokenGenerated")) {
            var dado = JSON.parse(localStorage.getItem("tokenGenerated"))

            if (dado != "") {
                this.$store.commit('successLogin', dado)
            }
        }

    },

    created() {
        console.log("CREATED - Montar modal")
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        //var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        //var span = document.getElementsByClassName("close")[0];

        /* When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }*/

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },

    methods: {
        verifyLoginPassword() {
            if (!this.user.login || !this.user.password) {
                return true
            } else {
                return false
            }
        },

        login() {
            console.log("email:" + this.user.login)
            console.log("senha:" + this.user.password)

            http.post('/auth', {
                    "email": `${this.user.login}`,
                    "senha": `${this.user.password}`
                })
                .then(
                    (result) => {
                        this.$store.commit('successLogin', result.data)
                        this.$router.push('/')
                        //console.log(result.data)
                    }
                )
                .catch(

                    error => {
                        try {
                            console.log("email:" + this.user.login)
                            console.log("senha:" + this.user.password)
                            console.log("Usuario logado:" + this.$store.state.loggedIn)
                            this.$store.dispatch('errorLogin', [true, error.response.data.mensagem])
                        } catch (e) {
                            this.$store.dispatch('errorLogin', [true, null])
                            console.log("indefinido: " + e);
                        }

                    }
                )

        },

        openModalCadastro(evento) {

            console.log("Click funcionando...")
            var modal = document.getElementById("myModal");

            if (evento == 'abrir') {
                modal.style.display = "block";
                this.viewModal = true
            }

            if (evento == 'fechar') {
                modal.style.display = "none";
                this.viewModal = false
            }

        },

        realizarCadastro() {

            console.log("Click realizar cadastro...")
            console.log("nome:" + this.registerUser.name)
            console.log("email:" + this.registerUser.login)
            console.log("senha:" + this.registerUser.password)
            console.log("senha confirm:" + this.registerUser.passwordConfirm)

            //CHAMADA da API - realizar o cadastro
            function cadastrarUsuario() {
                http.post('/usuarios', {
                        "email": `${this.user.login}`,
                        "senha": `${this.user.password}`
                    }, {
                        headers: {
                            //user: JSON.stringify(this.user),
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(
                        (result) => {
                            this.$store.commit('successLogin', result.data)
                            this.$router.push('/')
                            //console.log(result.data)
                        }
                    )
                    .catch(
                        error => {
                            try {
                                console.log("email:" + this.user.login)
                                console.log("senha:" + this.user.password)
                                console.log("Usuario logado:" + this.$store.state.loggedIn)
                                this.$store.dispatch('errorLogin', [true, error.response.data.mensagem])
                            } catch (e) {
                                this.$store.dispatch('errorLogin', [true, null])
                                console.log("indefinido: " + e);
                            }
                        }
                    )

                var modal = document.getElementById("myModal");
                modal.style.display = "none";
            }

            //VALIDAÇÃO DOS CAMPOS
            function validaItem(info) {
                if (info !== "") {
                    return true
                } else {
                    return false
                }
            }

            function validateEmail(email) {
                var re = /\S+@\S+\.\S+/;
                return re.test(email);
            }

            var resultado = ""

            Object.values(this.registerUser).forEach((item) => {
                resultado += " " + validaItem(item)
            })

            if (resultado.includes("false")) {
                console.log("Erro - Preencha todos os campos.")
            } else if (this.registerUser.password !== this.registerUser.passwordConfirm) {
                console.log("Erro - Senhas divergentes, verifique os valores e tente novamente.")
            } else if (validateEmail(this.registerUser.email)) {
                console.log("Erro - e-amil inválido.")
            } else {
                console.log("Cadastrar usuário...")
                cadastrarUsuario()
            }
        },
    }
}
</script>

<style lang="scss">
@import '../styles/buttons.scss';
@import '../styles/typography.scss';
@import '../styles/modal.scss';

html {
    background-color: #fff;
}

body {
    font-family: "Poppins", sans-serif;
    height: 100vh;
    margin-top: 6%;
}

a {
    color: #92badd;
    display: inline-block;
    text-decoration: none;
    font-weight: 400;
}

.modalh2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    margin: 40px 8px 10px 8px;
    color: white;
}

/* STRUCTURE */

.wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
}

#formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
}

#formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
    color: #cccccc;
}

h2.active {
    color: #0d0d0d;
    border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type=text] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
    color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

@keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-moz-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fadeIn {
    opacity: 0;
    -webkit-animation: fadeIn ease-in 1;
    -moz-animation: fadeIn ease-in 1;
    animation: fadeIn ease-in 1;

    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    animation-fill-mode: forwards;

    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    animation-duration: 1s;
}

.fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

.fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
}

.fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
}

.underlineHover:hover {
    color: #0d0d0d;
}

.underlineHover:hover:after {
    width: 100%;
}

/* OTHERS */

*:focus {
    outline: none;
}

#icon {
    width: 60%;
}

/* MENSAGEM DE ALERTA */
/* The alert message box */
.alert {
    padding: 20px;
    background-color: #f44336;
    /* Red */
    color: white;
    margin-bottom: 15px;
}

/* The close button */
.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: black;
}

/* Customizados */
input.register {
    text-align: left;
    background-color: white;
    border: none;
    color: #676767;
    padding: 15px 15px;
    margin: 5px;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    width: 88%;
    border: 2px solid #f6f6f6;
    transition: all 0.5s ease-in-out;
    border-radius: 5px;

}

input.btn-secundary {
    margin: 5px 20px 7px 20px;
}
</style>
