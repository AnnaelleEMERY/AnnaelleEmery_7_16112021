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
      <button class="send btn btn-dark text-light" @click="submit()">
        Envoyer !
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submit() {
      axios.get("auth/login", this.form)
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert(
            "l'utilisateur " + data.pseudo + " a bien été trouvé !"
          );
          this.$router.replace({
            name: "Profile",
          });
        })
        .catch((error) => {
          this.data = alert("Utilisateur non trouvé ou un autre problème est survenu !");
          console.log({ error });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #091f43;
$secondary-color: #d1515a;
$tertiary-color: #d8d8d8;
$white-color: #ffffff;
$text-color: #131e2a;

.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 120;
  .card {
    display: flex;
    flex-direction: column;
    max-width: 52rem;
    width: 100%;
    height: 100%;
    .card-title {
      text-align: center;
      font-size: 1.8rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid $secondary-color;
    }
    .card-body {
      .box {
        display: flex;
        justify-content: space-between;
        label {
          display: inline-flex;
          justify-content: flex-start;
          font-size: 1.4rem;
          width: 30%;
          text-decoration: underline;
          margin-right: 1rem;
        }
        input {
          width: 70%;
          height: 2rem;
          margin-bottom: 1.5rem;

          &:focus {
            border: 2px solid $primary-color;
            outline: none;
          }
        }
      }
    }
    .send {
      width: 30%;
      margin: auto;
      font-weight: bold;
      background-color: $secondary-color;
      display: inline-flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 4px 4px $tertiary-color;
      border: 2px solid $secondary-color;
      margin-top: 1rem;
      margin-bottom: 5rem;
    }
    .send:hover {
      box-shadow: 6px 6px $primary-color;
      cursor: pointer;
    }
  }
}
</style>