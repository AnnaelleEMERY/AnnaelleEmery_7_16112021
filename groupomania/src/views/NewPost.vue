<template>
  <div class="new-post">
    <form class="crepost" action="" method="post">
      <h2>Envie de partager ?</h2>
      <div class="input-box">
        <label for="title"></label>
        <b-icon-newspaper class="icone"/>
        <input
          v-model="title"
          placeholder="Un titre à votre post, c'est ici..."
          id="titre"
          type="text"
          pattern="[a-zA-ZÀ-ÿ]{1,128}"
        />
      </div>
      <div class="input-box">
        <label for="body"></label>
        <b-icon-newspaper class="icone"/>
        <input
          v-model="body"
          placeholder="Ici le corps de votre post..."
          id="body"
          type="text"
          pattern="[a-zA-ZÀ-ÿ]{1,512}"
          />
      </div>
      <div class="input-box">
        <b-icon-card-image class="icone" />
        <label for="image"></label>
        <input
          v-model="image"
          placeholder="ici l'url de votre image..."
          id="image"
          type="text"
          pattern="/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)
          (?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/"
        />
      </div>
      <div class="submit-btn-container">
        <button
          v-on:click.prevent="createPost"
          class="submit"
          type="submit"
        >
        <b-icon-signpost class="icone"/>
        Envoyer !
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'

export default {
  name: "NewPost",
  data() {
    return {
        post: {
        title: "",
        body:"",
        image: "",
        user_id: ""
      }
    }
  },
  methods: {
    createPost() {
      console.log(this.createdAt);
      axios.post("auth/createPost", {
          title: this.title,
          body: this.body,
          image: this.image,
          user_id: this.user[0].id
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert(
            "Le post "+ data.title +" a bien été posté"
          );
          this.$router.replace({
              name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("erreur la route est longue !");
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  }
};
</script>

<style scoped lang="scss">
.new-post {
  background-color: violet;
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: center;
  align-items: center;
  .crepost {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    background: green;
    margin: 8% auto;
    padding: 50px 0;
    color: violet;
    box-shadow: 0 0 10px 3px red;
    h2 {
      font-size: 2em;
      color: violet;
      padding: 5px 10px 5px 10px;
      border-bottom: 2px solid violet;
      border-radius: 0 0 30px 0;
      box-shadow: 2px 2px 2px red;
    }
    .input-box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 80%;
      border-bottom: 1px solid violet;
      border-radius: 0 0 30px 0;
      padding: 10px 10px 5px 0;
      input {
        width: 90%;
        border: none;
        outline: none;
        background: transparent;
        font-size: 1.2em;
        color: violet;
      }
    }
    ::placeholder {
      color: violet;
    }
    .icone{
      margin-right: 10px;
      color: grey;
    }
  }
  a {
      text-decoration: none;
    }
  .submit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin: 40px auto 20px;
    cursor: pointer;
    background-color: transparent;
    color: violet;
    border: none;
    font-size: 1.5em;
    .icone {
      display: block;
      font-size: 3em;
      position: relative;
      padding: 10px 10px 10px 10px;
      border: none;
      border-radius: 30px 30px 30px 30px;
      box-shadow: 5px 5px 20px grey;
    }
    .icone:hover {
      top: 5px;
      box-shadow: 5px 5px 15px grey;
      color: violet;
    }
    .icone:active {
      top: 10px;
      box-shadow: 5px 5px 5px grey;
      color: violet;
    }
  }
}
</style>