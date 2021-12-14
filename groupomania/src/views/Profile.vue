<template>
  <div class="profile">
    <section class="profile__section">
      <h1 class="profile__section__title">Votre Profil Utilisateur :</h1>
      <div class="profile__section__identity">
        <div class="profile__section__identity__pseudo">Votre Pseudo : {{ user[0].pseudo }}</div>
        <div class="profile__section__identity__pseudo">Votre Nom : {{ user[0].nom }}</div>
        <div class="profile__section__identity__pseudo">Votre Prénom : {{ user[0].prenom }}</div>
        <div class="profile__section__identity__email">Votre adresse email : {{ user[0].email}}</div>
        <div class="profile__section__identity__etablissement">Vous travaillez dans l'établissement' : {{ user[0].etablissement }}</div>
        <div class="profile__section__identity__image">Votre image d'avatar : <img v-bind:src="user[0].photo || 'https://picsum.photos/300/200?random'" alt="image avatar" class="profil_detail__avatar"/></div>
        <div class="modifier">Souhaitez-vous modifier ces informations ?</div>
        <button class="modify" v-on:click="showUpdateProfile = true"><b-icon-pencil class="icone"/> Modifier !!</button>
        <div class="modal-overlay" v-if="showUpdateProfile">
          <button class="close btn btn-danger text-light" @click="showUpdateProfile = false">X</button>
          <UpdateProfile v-if="showUpdateProfile" />
        </div>
        <div class="effacer">
          <h2 class="titre">Effacer votre compte ?</h2>
          <h3 class="warning">Attention, ceci effacera également tous vos messages et commentaires...</h3>
          <button v-on:click.prevent="deleteUser()" class="trash"><b-icon-trash class="icone"/></button>
        </div>
      </div>
    </section>
    <article class="publications">
      <h2 class="posts">Vos publications :</h2>
      <div class="card-cart-container col-12">
        <div :key="index" v-for="(post, index) in posts" class="col-xs-12 col-md-3 col-lg-3 card-container">
          <router-link :to='`/Post/${post.id}`'> 
            <div class="card">
              <h4 class="card__title">{{ post.title }}</h4>
              <div class="card__img">
                <img v-bind:src="post.image || 'https://picsum.photos/300/200?random'" alt="image" class="card-image"/>
              </div>
              <p class="card__body">{{ post.body }}</p>
              <div v-if="authenticated" class="like-dislike">
                <div class="like">
                  <b-icon-hand-thumbs-up class="icone"/>
                  <p class="like-count">{{ post.likeCount }}</p>
                </div>
                <div class="dislike">
                  <b-icon-hand-thumbs-down class="icone"/>
                  <p class="like-count">{{ post.dislikeCount }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'
import UpdateProfile from '@/components/UpdateProfile'

export default {
  name: "Profile",
  components: {
    UpdateProfile
  },
  data: () => {
    return {
      posts: [],
      showUpdateProfile: false
    }
  },
  mounted: function() {
    this.getPostsFromUser();
  },
  /* 
  ** Récupérer ses publications **
  ** lien pour la modification de ses données personnelles **
  */
 methods: {
    getPostsFromUser() {
      axios.get(`auth/posts/user/${this.user[0].id}`)
      .then(response => {
        let data = response.data;
        this.posts = data;
      })
      .catch(error => {
        this.data = alert("erreur, rien a afficher !");
        console.log('pas coucou' + error);
      })
    },
    deleteUser() {
      if (
        confirm("etes vous sûr de vouloir supprimer le profil ?") &&
        confirm("La suppression efface toutes les publications...")
      ) {
      axios.delete(`auth/user/delete/${this.user[0].id}`)
      .then(() => {
        alert('Utilisateur supprimé !');
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
    },
    ...mapActions({
      logOutAction: 'auth/logout'
    }),
    logOut () {
      this.logOutAction().then(() => {
        this.$router.replace({
          name: 'Home'
        })
      })
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  }

}
</script>

<style lang="scss" scoped>
.profile {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: red;
  &__section {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: red;
    &__title {
      font-size: 1.5em;
      color: lightgrey;
      padding: 1%;
      border-radius: 50px;
      border-bottom: 2px solid darkgreen;
    }
    &__identity {
      background-color: green;
      padding: 2%;
      display: flex;
      border-radius: 50px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &__pseudo {
        font-size: 1em;
        color: red;
      }
      &__email {
        font-size: 1em;
        color: red;
      }
      &__etablissement {
        font-size: 1em;
        color: red;
      }
      &__image {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        color: red;
        img {
          border-radius: 40px;
          max-width: 20%;
        }
      }
      .modifier {
        color: red;
      }
      .modify{
        display: block;
        position: relative;
        width: 45%;
        margin: 10px auto;
        padding: 5px 10px 8px 10px;
        text-decoration: none;
        background-color: red;
        color: lightgrey;
        font-size: 0.9em;
        border: 1px solid green;
        box-shadow: 0 10px 10px grey;
        border-radius: 30px;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
        .icone1 {
          font-size: 1.2em;
        }
      }
      .modify:hover {
        top: 2px;
        color: darkgreen;
        box-shadow: 0 8px 8px grey;
      }
      .modify:active {
        top: 8px;
        box-shadow: 0 2px 2px grey;
      }
      .modal-overlay{
        background-color: #15151693;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        .close {
          position: absolute;
          top: 40px;
          right: 30px;
          z-index: 110;
          background-color: red;
          width: 40px;
          height: 40px;
        }
      }
      .effacer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px auto;
        .titre {
          font-size: 1em;
          color: red;
        }
        .warning {
          font-size: 1em;
          color: red;
          background-color: violet;
        }
        .trash {
          display: block;
          position: relative;
          margin: 5px auto;
          background-color: violet;
          border: none;
          border-radius: 50%;
          padding: 10px;
          box-shadow: 5px 5px 8px grey;
          .icone {
            color: red;
            font-size: 2em;
          }
        }
        .trash:hover {
          top: 2px;
          box-shadow: 3px 3px 6px grey;
          background-color: red;
          .icone {
            color: violet;
          }
        }
        .trash:active {
          top: 4px;
          box-shadow: 1px 1px 4px grey;
          background-color: red;
          .icone {
            color: violet;
          }
        }
      }
    }
  }
  .publications {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: red;
    .posts {
      font-size: 1.5em;
      color: lightgrey;
      padding: 1%;
      border-radius: 50px;
      border-bottom: 2px solid darkgreen;
    }
    .card-cart-container{
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: flex-start;
      .card-container {
        margin: 10px 2% 10px 2%;
        padding: 0;
        width: 300px;
        a {
          text-decoration: none;
        }
        .card{
          display: block;
          position: relative;
          width: 100%;
          border-style: none;
          border-radius: 40px 0 40px 0;
          box-shadow: 0 10px gold;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(45deg, gold, lightgrey);
          padding:5px;
          &__title {
            font-size: 1.5em;
            font-style: italic;
            background-color: green;
            border-radius: 30px;
            padding: 5px 8px;
            margin-top: 10px;
            margin-right: 10px;
            margin-left: 10px;
            box-shadow: 0 5px 5px grey;
            color: red;
          }
          &__img{
            margin: 10px;
            padding: 0;
            img{
               width: 100%;
               border-radius: 20px;
            }
          }
          &__body{
            background-color: green;
            color: red;
            width: 96%;
            max-height: 200px;
            margin: 2%;
            padding: 5px;
            font-size: 1.5em;
            border-radius: 30px;
            box-shadow: 0 5px 5px grey;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis; 
          }
          .like-dislike {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-color:lightgrey;
            color: lightgrey;
            padding: 0;
            border-radius: 20px;
            width: 80%;
            .like {
              width: 40%;
              padding: 0;
              margin-left: 5%;
              margin-right: 5%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              .icone {
                display: block;
                position: relative;
                cursor: pointer;
                font-size: 2em;
                text-shadow: 2px 2px 5px #1ed4add0;
              }
              .icone:hover {
                top: 2px;
                text-shadow: 2px 2px 3px #1ed4add0;
                color: #3cc50e;
              }
              .icone:active {
                top: 4px;
                text-shadow: 2px 2px 1px #1ed4add0;
              }
              .like-count {
                font-size: 1.2em;
                color: red;
                margin-top: 10px;
                padding: 2px 8px 2px 8px;
                border: 1px solid lightgrey;
                border-radius: 20px;
                box-shadow: 2px 2px 1px grey;
              }
            }
            .dislike {
              width: 40%;
              padding: 0;
              margin-left: 5%;
              margin-right: 5%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              .icone {
                display: block;
                position: relative;
                cursor: pointer;
                font-size: 2em;
                text-shadow: 2px 2px 5px #1ed4add0;
              }
              .icone:hover {
                top: 2px;
                text-shadow: 2px 2px 3px #1ed4add0;
                color: darkgreen;
              }
              .icone:active {
                top: 4px;
                text-shadow: 2px 2px 1px #1ed4add0;
              }
              .like-count {
                font-size: 1.2em;
                color: red;
                margin-top: 10px;
                padding: 2px 8px 2px 8px;
                border: 1px solid lightgrey;
                border-radius: 20px;
                box-shadow: 2px 2px 1px grey;
              }
            }
          }
        }
        .card:hover {
          box-shadow: 0 8px red;
          top: 4px;
        }
        .card:active {
          box-shadow: 0 2px red;
          top: 8px;
        }
      }
    }
  }
}

</style>