<template>
  <div id="post">
    <article class="post_detail">

      <!-- Détails du post -->
      <div  class="card col-8 text-center">
        <h4 class="card-title">{{ post.title }}</h4>
        <img class="card-img" v-bind:src="post.image || 'https://picsum.photos/300/200?random'" alt="image" />
        <p class="card-body">{{ post.body }}</p>

        <!-- Créé le ... -->
        <p class="card-date">Créé le : {{ post.createdAt | moment('calendar') }}</p>
        <p v-if="post.createdAt !== post.updatedAt" class="card-date">Modifié le : {{ post.updatedAt | moment('calendar') }}</p>
        <div class="like-dislike">

          <!-- Likes -->
          <div class="like">
            <b-icon-hand-thumbs-up v-on:click="like()" class="icone"/>
            <p class="like-count">{{ post.likeCount }}</p>
          </div>

          <!-- Dislikes -->
          <button v-on:click="cancelVote()" class="btn btn-danger text-warning">Annuler Vote</button>
          <div class="dislike">
            <b-icon-hand-thumbs-down v-on:click="disLike()" class="icone"/>
            <p class="dislike-count">{{ post.dislikeCount }}</p>
          </div>
        </div>

        <!-- Editer -->
        <div v-if="post.user_id === user[0].id || user[0].isAdmin === 1" class="boutons">
          <button class="modify" v-on:click="showUpdatePost = true"><b-icon-pencil class="icone1"/>Editer...</button>
          
          
          <div class="modal-overlay" v-if="showUpdatePost">
            <button class="close btn btn-danger text-light" @click="showUpdatePost = false">X</button>
            <UpdatePost v-if="showUpdatePost" />
          </div>
          
          <!-- Supprimer le post -->
          <button v-on:click.prevent="deletePost()" class="deletePost" title="Effacer votre message"><b-icon-trash class="icone2"/>Effacer...</button>
        </div>

        <!-- Ajouter un commentaire -->
        <section class="create_comment">
          <h2 class="title">Votre commentaire :</h2>
          <div class="comment_corpse">
            <input v-model="newComment.body" class="commentaire" placeholder="Ici Votre commentaire..." type="text" pattern="[a-zA-ZÀ-ÿ]{1,512}" />
            <button v-on:click.prevent="postComment()" class="comment-btn" type="submit">Go !</button>
          </div>
        </section>

        <!-- Montrer les commentaires -->
        <section class="display_comments">
          <div :key="index" v-for="(comment, index) in comments" class="commentaire">
            <p class="body">{{ comment.body }}</p>
            <p class="date">{{ comment.createdAt | moment('calendar') }}</p>
            <p v-if="comment.createdAt !== comment.updatedAt" class="date">Modifié le : {{ comment.updatedAt | moment('calendar') }}</p>
            <button v-on:click="showUpdateComment = true" v-if="comment.users_id === user[0].id || user[0].isAdmin === 1"><b-icon-pencil class="icone"/>Modifier le commentaire</button>
            <div class="modal-overlay" v-if="showUpdateComment">
              <button class="close btn btn-danger text-light" @click="showUpdateComment = false">X</button>
              <UpdateComment v-if="showUpdateComment" />
            </div>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'
import UpdatePost from '@/components/UpdatePost.vue'
import UpdateComment from '@/components/UpdateComment.vue'


export default {
  name: "Post",
  components: {
    UpdatePost,
    UpdateComment
  },
  data() {
    return {
      id: this.$route.params.id,
      post: {},
      newComment: {
        body: ""
      },
      comments: [],
      showUpdatePost: false,
      showUpdateComment: false
    }
  },
  created() {
    this.getOnePost();
  },
  beforeMount() {
    this.findAllPostComments();
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    async getOnePost() {
      await axios.get(`auth/post/${this.id}`)
        .then(response => {
          let data = response.data;
          this.post = data[0];
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })
    },
    async postComment() {
      await axios.post(`auth/createComment`, {
          body: this.newComment.body,
          users_id: this.user[0].id,
          posts_id: this.id
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("le Commentaire a été envoyé !");
          this.$router.replace({
            name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    },
    async findAllPostComments() {
      await axios.get(`auth/comments/post/${this.id}`)
        .then(response => {
          this.comments = response.data;
          console.log(this.comments);
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })

    },
    async deletePost() {
      if (
        confirm("Etes-vous sûr et certain de vouloir supprimer ce post ?")&&
        confirm("C'est définif, sûr ?")
      ) {
      await axios.delete(`auth/post/delete/${this.id}`)
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("Le post a bien été supprimé !");
          this.$router.replace({
            name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("erreur, pas de suppression !")
          console.log(error);
        })
      }
    },
    like() {
      axios.post(`auth/${this.id}/likeDislike`, {
        userId: this.user[0].id,
        postId: this.id,
        likes: 1,
        dislikes: 0
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("Votre Like a bien été envoyé !");
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    },
    disLike() {
      axios.post(`auth/${this.id}/likeDislike`, {
        userId: this.user[0].id,
        postId: this.id,
        likes: 0,
        dislikes: 1
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("Votre Dislike a bien été envoyé !");
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    },
    cancelVote() {
      axios.post(`auth/${this.id}/likeDislike`, {
        userId: this.user[0].id,
        postId: this.id,
        likes: 0,
        dislikes: 0
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("l'annulation acceptée !");
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #091f43;
$secondary-color: #d1515a;
$tertiary-color: #d8d8d8;
$white-color: #ffffff;
$text-color: #131e2a;

#post {
  background-color: $tertiary-color;
  width: 100%;
  margin-top: 130px;
  .post_detail {
    .card{
      width: 90%;
      margin: 1px auto;
      border-style: none;
      border-radius: 30px;
      box-shadow: 0 10px $secondary-color;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $tertiary-color;
      padding:5px;
      .card-title {
        font-size: 1em;
        color: $tertiary-color;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
      }
      .card-img {
        max-width: 80%;
        max-height: 300px;
      }
      .card-body {
        font-size: 0.8em;
        color: $tertiary-color;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
      }
      .card-date {
        font-size: 0.8em;
        color: $text-color;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
      }
      .like-dislike {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        color: $tertiary-color;
        padding: 0;
        border-radius: 20px;
        width: 90%;
        .like {
          width: 40%;
          padding: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .icone {
            color: $primary-color;
            display: block;
            position: relative;
            margin-left: 30px;
            margin-right: 10px;
            cursor: pointer;
            font-size: 2em;
            text-shadow: 2px 2px 5px $tertiary-color;
          }
          .icone:hover {
            top: 2px;
            text-shadow: 2px 2px 3px $tertiary-color;
            color: rgb(19, 19, 129);
          }
          .icone:active {
            top: 4px;
            text-shadow: 2px 2px 1px $tertiary-color;
          }
          .like-count {
            display: block;
            position: relative;
            top: 5px;
            font-size: 1.2em;
            color: $text-color;
            padding: 2px 8px 2px 8px;
            border: 1px solid $tertiary-color;
            border-radius: 20px;
            box-shadow: 2px 2px 1px $tertiary-color;
          }
        }
        .dislike {
          width: 40%;
          padding: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .icone {
            color: $secondary-color;
            display: block;
            position: relative;
            margin-left: 30px;
            margin-right: 10px;
            cursor: pointer;
            font-size: 2em;
            text-shadow: 2px 2px 5px $tertiary-color;
          }
          .icone:hover {
            top: 2px;
            text-shadow: 2px 2px 3px $tertiary-color;
            color: #3cc50e;
          }
          .icone:active {
            top: 4px;
            text-shadow: 2px 2px 1px $tertiary-color;
          }
          .dislike-count {
            display: block;
            position: relative;
            top: 5px;
            font-size: 1.2em;
            color: $text-color;
            margin-right: 50px;
            padding: 2px 8px 2px 8px;
            border: 1px solid $tertiary-color;
            border-radius: 20px;
            box-shadow: 2px 2px 1px $tertiary-color;
          }
        }
      }
      .boutons{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 80%;
        .modify{
          display: block;
          position: relative;
          width: 45%;
          margin: 10px auto;
          padding: 5px 10px 8px 10px;
          text-decoration: none;
          background-color: $tertiary-color;
          color: $tertiary-color;
          font-size: 0.9em;
          border: 1px solid $primary-color;
          box-shadow: 0 10px 10px $tertiary-color;
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
          color: red;
          box-shadow: 0 8px 8px $tertiary-color;
        }
        .modify:active {
          top: 8px;
          box-shadow: 0 2px 2px $tertiary-color;
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
        .deletePost {
          display: block;
          position: relative;
          width: 45%;
          margin: 10px auto;
          padding: 5px 10px 8px 10px;
          text-decoration: none;
          background-color: $secondary-color;
          color: $white-color;
          font-size: 0.9em;
          border: 1px solid $secondary-color;
          box-shadow: 0 10px 10px $tertiary-color;
          border-radius: 30px;
          @media screen and (min-width: 768px) {
            font-size: 1.5em;
          }
          .icone2 {
            font-size: 1.2em;
          }
        }
        .deletePost:hover {
          top: 2px;
          cursor: pointer;
          color: $white-color;
          box-shadow: 0 8px 8px $primary-color;
        }
        .deletePost:active {
          top: 8px;
          color: $tertiary-color;
          box-shadow: 0 2px 2px $tertiary-color;
        }
      }
      .create_comment {
        width: 90%;
        background-color: $tertiary-color;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        .title {
          margin: 5px auto;
          font-size: 1.2em;
          color: $tertiary-color;
          @media screen and (min-width: 768px) {
            font-size: 1.5em;
          }
        }
        .comment_corpse {
          display: flex;
          flex-direction: column;
          margin: 5px auto;
          .commentaire {
            font-size: 1.1em;
            border-radius: 20px;
            margin-right: 10px;
          }
          .comment-btn {
            display: block;
            position: relative;
            margin: 10px auto;
            padding: 2px 15px 8px 15px;
            text-decoration: none;
            background-color: $primary-color;
            color: $white-color;
            font-size: 1.2em;
            border-style: none;
            box-shadow: 0 10px 10px $secondary-color;
            border-radius: 30px;
            cursor: pointer;
          }
          .comment-btn:hover {
            top: 2px;
            box-shadow: 0 8px 8px $primary-color;
          }
          .comment-btn:active {
            top: 8px;
            box-shadow: 0 2px 2px $primary-color;
          }
        }
      }
      .display_comments {
        .commentaire {
          background-color: $tertiary-color;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid $secondary-color;
          color: $text-color;
          margin: 2px auto;
          .body {
            padding-right: 20px;
            padding-left: 20px;
            font-size: 1em;
            border-bottom: 2px solid $tertiary-color;
            border-radius: 0 0 30px 0;
          }
          .date {
            font-size: 0.7em;
          }
          a {
            text-decoration: none;
            color: $tertiary-color;
            font-size: 1em;
            .icone {
              color: $secondary-color;
              margin-right: 10px;
            }
          }
          .modal-overlay{
            background-color: $text-color;
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
              background-color: $secondary-color;
              width: 40px;
              height: 40px;
            }
          }
        }
      }
    }
  }
}
</style>