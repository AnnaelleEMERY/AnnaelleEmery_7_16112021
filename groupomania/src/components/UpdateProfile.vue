<template>
  <div class="profile-contain">
    <div class="card col-10 bg-info text-light">
      <h1 class="card-title">Modifiez vos données :</h1>
      <form action="" class="card-body profile">
        <div class="box">
          <label for="pseudo">Pseudo :</label>
          <input 
            type="text"
            v-bind:placeholder="users.pseudo"
            v-model="form.pseudo"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
            />
        </div>
        <div class="box">
          <label for="pseudo">Nom :</label>
          <input 
            type="text"
            v-bind:placeholder="users.nom"
            v-model="form.pseudo"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
            />
        </div>
        <div class="box">
          <label for="pseudo">Prénom :</label>
          <input 
            type="text"
            v-bind:placeholder="users.prenom"
            v-model="form.pseudo"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
            />
        </div>
        <div class="box">
          <label for="etablissement">Etablissement :</label>
          <input
            type="text"
            v-bind:placeholder="users.etablissement"
            v-model="form.etablissement"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
          />
        </div>
        <div class="box">
          <label for="email">E-mail :</label>
          <input
            type="text"
            v-bind:placeholder="users.email"
            v-model="form.email"
          />
        </div>
        <div class="box">
          <label for="photo">Photo :</label>
          <input
            type="text"
            v-bind:placeholder="users.photo"
            v-model="form.photo"
          />
        </div>
        <div v-if="user[0].isAdmin === 1" class="box">
          <label for="isAdmin">isAdmin :</label>
          <input
            type="text"
            v-bind:placeholder="users.isAdmin"
            v-model="form.isAdmin"
          />
        </div>
      </form>
      <div class="boutons">
        <button 
          v-on:click="updateProfile()"
          class="send btn btn-dark text-light"
          >
          <b-icon-signpost class="icone"/>Modifier !
        </button>
        <button 
          v-if="user[0].isAdmin === 1"
          v-on:click="deleteProfile()"
          class="delete btn btn-danger text-light"
          >
          <b-icon-trash class="icone"/>Effacer !
        </button>
        <p v-if="user[0].isAdmin === 1" class="alerte">Attention l'effacement est irréversible !<br/>Et supprime toutes les publications de l'utilisateur !</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    name: "Profil",
    data() {
      return {
        id: this.$route.params.id,
        form: {
          pseudo: "",
          etablissement: "",
          email: "",
          photo: "",
          isAdmin: ""
        },
        users: {}
      }
    },
    mounted: function() {
      this.getUserInfos()
    },
    methods: {
      async getUserInfos() {
        if(this.user[0].isAdmin === 1) {
          await axios.get(`auth/user/${this.id}`)
          .then(response => {
            console.log(response);
            this.form=response.data[0];
          })
          .catch(error => {
            this.data = alert('erreur, rien a afficher !');
            console.log(error + "mal joué !")
          })
        } else {
          await axios.get(`auth/user/${this.user[0].id}`)
          .then(response => {
            console.log(response);
            this.form=response.data[0];
          })
          .catch(error => {
            this.data = alert('erreur, rien a afficher !');
            console.log(error + "mal joué !")
          })
        }
      },
      async updateProfile() {
        if(this.user[0].isAdmin === 1) {
          await axios.put(`auth/user/update/${this.id}`, this.form)
          .then(response => {
            let data = response.data;
            console.log(data);
            this.data = alert(
              "usersateur modifié !"
            );
            this.$router.replace({
              name: 'Home'
            })
          })
          .catch(error => {
            this.data = alert("Une erreur s'est produite !");
            console.Log(error);
          })
        } else {
          await axios.put(`auth/user/update/${this.user[0].id}`, this.form)
          .then(response => {
            let data = response.data;
            console.log(data);
            this.data = alert(
              "usersateur modifié !"
            );
            this.$router.replace({
              name: 'Home'
            })
          })
          .catch(error => {
            this.data = alert("Une erreur s'est produite !");
            console.Log(error);
          })
        }
        
      },
      async deleteProfile() {
        if (
        confirm("Etes-vous sûr de vouloir supprimer cet article ?")&&
        confirm("C'est définif, sûr ?")
        ) {
        await axios.delete(`auth/user/delete/${this.user[0].id}`)
          .then(() => {
            alert('usersateur supprimé !');
            this.logOut();
            this.$router.replace({
              name: 'Home'
            });
          })
          .catch(error => {
              console.log(error);
              alert('une erreur !');
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
</script>

<style lang="scss" scoped>
.profile-contain {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 80%;
  height: 100vh;
  z-index: 120;
  .card {
    padding: 1%;
    .card-title {
      text-align: center;
      font-size: 1.5em;
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
          font-size: 1em;
          color: darkgrey;
        }
      }
    }
    .boutons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      .send, .delete {
        width: 20%;
        margin: auto;
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        box-shadow: 4px 4px red;
      }
      .send:hover, .delete:hover {
        box-shadow: 6px 6px red;
      }
      .alerte {
        font-size: 0.8em;
        color: red;
        background-color: red;
        margin: 0;
        padding: 1%;
        border-radius: 20px;
      }
    }
    
  }
}
</style>
