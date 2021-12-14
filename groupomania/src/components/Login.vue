<template>
  <div class="login_container">
      <div class="card col-10 bg-info text-light">
        <h1 class="card-title">Identifiez-vous ici !</h1>
        <form class="card-body">
            <div class="box">
                <label for="email">Renseignez ici votre email :</label>
                <input
                    v-model="form.email"
                    type="text" 
                    class="email"
                    placeholder="toto@titi.fr"
                />
            </div>
            <div class="box">
                 <label for="password">Renseignez ici votre Mot de passe :</label>
                <input
                    v-model="form.password"
                    type="password" 
                    class="password"
                    placeholder="..."
                />
            </div>
        </form>
        <button class="send btn btn-dark text-light" @click="submit()">Envoyer !</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        submit () {
            this.login(this.form)
            .then(() => {
                this.$router.replace({
                    name: 'Profile'
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    z-index: 120;
    .card {
      padding: 1%;
      .card-title {
        text-align: center;
        font-size: 1.2em;
      }
      .card-body {
        .box {
          display: flex;
          justify-content: space-between;
          label {
            display: inline-flex;
            justify-content: center;
            width: 25%;
            text-decoration: underline;
          }
          input {
            width: 75%;
          }
        }
      }
      .send {
        width: 30%;
        margin: auto;
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