<template>
  <section class="post-contain">
    <div class="card col-10 bg-info text-light">
      <h1 class="card-title">Quelque chose à changer ?</h1>
      <form class="card-body profile" action="" method="post">
        <div class="box">
          <label for="body">Commentaire : </label>
          <input
            v-model="newComment.body"
            v-bind:placeholder="comment.body"
            autofocus
            id="body"
            type="text"
            pattern="[a-zA-ZÀ-ÿ]{1,512}"
            />
          </div>
      </form>
      <div class="boutons">
          <button
            v-on:click.prevent="updateComment()"
            class="send btn btn-dark text-light">
            <b-icon-signpost class="icone"/>Modifier !
          </button>
          <button
              v-on:click.prevent="deleteComment()"
              class="delete btn btn-dark text-light">
              <b-icon-trash class="icone"/>Effacer !
          </button>
        </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateComment",
  data() {
    return {
      id: this.$route.params.id,
      comment: [],
      newComment: {
        body: ""
      }
    }
  },
  mounted: function() {
    this.getComment();
  },
  methods: {
    getComment() {
      axios.get(`auth/comments/post/${this.id}`)
        .then(response => {
          let data = response.data;
          this.comment = data[0];
          console.log(this.comment);
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })
    },
    updateComment() {
      let commentId = this.comment.id
        axios.put(`auth/comment/update/${commentId}`,
        {
            body: this.newComment.body
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert(
            "le commentaire a bien été modifié !"
          );
          this.$router.replace({
              name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("une erreur s'est produite !");
          console.log(error);
        });
    },
    deleteComment() {
        axios.delete(`auth/comment/delete/${this.id}`)
        .then(() => {
            alert('Commentaire effacé !');
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
};
</script>

<style scoped lang="scss">
 .post-contain {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    z-index: 110;
    .card {
      padding: 1%;
      .card-title {
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
          width: 30%;
          margin: auto;
          display: inline-flex;
          align-items: center;
          justify-content: space-around;
          box-shadow: 4px 4px grey;
        }
        .send:hover, .delete:hover {
          box-shadow: 6px 6px grey;
        }
      }
      
    }
  }
</style>