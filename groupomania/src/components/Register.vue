<template>
    <div class="register-container">
        <div class="card col-10 bg-secondary text-light">
            <h1 class="card-title">Pour vous inscrire, renseignez les champs ci-dessous :</h1>
            <form class="card-body">
                <div class="box">
                    <label for="pseudo">Choisissez un Pseudo *</label>
                    <input
                        v-model="form.pseudo"
                        required= true
                        type="text" 
                        class="pseudo"
                        placeholder="Renseignez ici votre Pseudo :"
                        pattern="[a-zA-ZÀ-ÿ]{1,64}"
                    />
                </div>
                <div class="box">
                    <label for="nom">Inscrivez votre nom *</label>
                    <input
                        v-model="form.nom"
                        required= true
                        type="text" 
                        class="nom"
                        placeholder="Renseignez ici votre Nom :"
                        pattern="[a-zA-ZÀ-ÿ]{1,64}"
                    />
                </div>
                <div class="box">
                    <label for="prenom">Inscrivez votre prénom *</label>
                    <input
                        v-model="form.prenom"
                        required= true
                        type="text" 
                        class="prénom"
                        placeholder="Renseignez ici votre Prénom :"
                        pattern="[a-zA-ZÀ-ÿ]{1,64}"
                    />
                </div>
                <div class="box">
                    <label for="etablissement">Etablissement *</label>
                    <input
                        required= true
                        type="text"
                        class="etablissement"
                        placeholder="Renseignez ici votre etablissement :"
                        v-model="form.etablissement"
                        pattern="[a-zA-ZÀ-ÿ]{1,30}"
                    />
                </div>
                <div class="box">
                    <label for="email">Votre adresse email *</label>
                    <input
                        required= true
                        v-model="form.email"
                        type="text" 
                        class="email"
                        placeholder="Renseignez ici votre email :"
                        pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}"
                    />
                </div>
                <div class="box">
                    <label for="photo">Choisissez-vous un avatar</label>
                    <input
                        v-model="form.photo"
                        placeholder="Saisissez l'url de votre avatar"
                        id="photo"
                        type="text"
                    />
                </div>
                <div class="box">
                    <label for="password">Un mot de passe *</label>
                    <input
                    v-model="form.password"
                    required= true
                    type="password" 
                    class="password"
                    placeholder="6 Caractères minimum avec une majuscule et un chiffre..."
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                    />
                </div>
            </form>
            <p class="alerte">Les champs marqués d'un * sont obligatoires, merci.</p>
            <button class="send btn text-dark" @click="register()">Envoyer !</button>
        </div>
    </div>
</template>

<script>
//import { mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'register',

    data() {
        return {
            form: {
                pseudo: "",
                nom: "",
                prenom: "",
                email: "",
                photo: "",
                password: "",
                etablissement: "",
                isAdmin: null
            }
        }
    },
    methods: {
        register () {
            axios.post('/auth/users', this.form)
            .then(response => {
                let data = response.data;
                console.log(data);
                this.data = alert(
                "l'utilisateur " + data.pseudo + " a bien été ajouté !"
                );
                this.$router.replace({
                    name: 'Home'
                })
                
            })
            .catch(error => {
                if (error) {
                    alert('Mot de passe trop simple');
                    } else {
                        this.data = alert("tu t'es trompé quelque part !");
                        console.log(error);
                }
            })
        }
    }  
}
</script>

<style lang="scss" scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    z-index: 110;
    .card {
        padding: 1%;
        .card-title {
        text-align: center;
        font-size: 1.2em;
        border-bottom: 2px solid red;
        }
        .card-body {
            padding: 1%;
            .box {
                display: flex;
                justify-content: space-between;
                label {
                display: inline-flex;
                justify-content: flex-start;
                font-size: 0.8em;
                width: 25%;
                text-decoration: underline;
                }
                input {
                width: 75%;
                }
            }
        }
        .alerte {
            color: red;
            background-color: white;
            text-align: center;
            border: 2px solid red;
            border-radius: 20px;
            width: 70%;
            margin: 5px auto 10px auto;;
        }
        .send {
        width: 30%;
        margin: auto;
        font-weight: bold;
        background-color: red;
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        box-shadow: 4px 4px red;
        }
        .send:hover {
        box-shadow: 6px 6px red;
        }
    }
}
</style>