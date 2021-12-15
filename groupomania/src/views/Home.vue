<template>
  <div class="home col-12">
    <div class="tri">
      <button class="btn text-center">
        <router-link to="/NewPost"
          ><b-icon-plus-circle class="icone" /><span class="long"
            >Créer un nouveau post</span
          ></router-link
        >
      </button>
    </div>
    <article class="home_detail">
      <div class="card-cart-container">
        <div v-for="(post, index) in posts" :key="index" class="card-container">
          <router-link :to="`/Post/${post.id}`">
            <div class="card">
              <h4 class="card__title">{{ post.title }}</h4>
              <div class="card__img">
                <!---------------- Enlever l'image si il n'y a pas d'image ---------------->
                <img
                  v-bind:src="
                    post.image || 'https://picsum.photos/300/200?random'
                  "
                  alt="image"
                  class="card-image"
                />
              </div>
              <p class="card__body">{{ post.body }}</p>
              <p class="card-date">{{ post.createdAt | moment("calendar") }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Home",
  data: () => {
    return {
      posts: [],
    };
  },
  mounted: function () {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      await axios
        .get("auth/posts")
        .then((response) => {
          let data = response.data;
          this.posts = data.posts;
          console.log(this.posts);
        })
        .catch((error) => {
          this.data = alert("erreur, rien a afficher !");
          console.log("pas coucou" + error);
        });
    },
    async getPostsByCreatedAt() {
      await axios
        .get("auth/posts/createdAt/")
        .then((response) => {
          let data = response.data;
          this.posts = data.posts;
        })
        .catch((error) => {
          this.data = alert("erreur, rien a afficher !");
          console.log("pas coucou" + error);
        });
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #091f43;
$secondary-color: #d1515a;
$tertiary-color: #d8d8d8;
$white-color: #ffffff;
$text-color: #131e2a;

.home {
  margin: 0;
  padding: 2%;
  .tri {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 3rem 0 0 0;

    .btn {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: 1px solid $tertiary-color;
      background: $tertiary-color;
      color: $text-color;
      font-size: 0.7em;
      padding: 0.5rem 0;
      width: 25%;
      @media screen and (min-width: 768px) {
        font-size: 1em;
      }
      a {
        text-decoration: none;
        color: orange;

        @media screen and (min-width: 768px) {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      .icone {
        font-size: 1.2em;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
      }
      .long {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
  }
  &_detail {
    justify-content: center;
    align-items: center;

    .card-cart-container {
      display: initial;

      .card-container {
        margin: 2rem auto;
        padding: 0;
        max-width: 115rem;
        width: 100%;

        a {
          text-decoration: none;
        }
        .card {
          width: 100%;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: $tertiary-color;
          padding: 5px;

          &__title {
            font-size: 1.5em;
            font-style: italic;
            border-radius: 30px;
            padding: 5px 8px;
            margin-top: 10px;
            margin-right: 10px;
            margin-left: 10px;
            color: $text-color;
          }

          &__img {
            margin: 10px;
            padding: 0;

            img {
              width: 100%;
              border-radius: 20px;
            }
          }

          &__body {
            color: $text-color;
            width: 95%;
            font-size: 1rem;
            font-weight: 500;

            @media screen and (min-width: 768px) {
              font-size: 1.2em;
            }
          }

          .card-date {
            font-size: 1em;
            font-style: italic;
            padding: 5px 8px;
            margin-top: 10px;
            margin-right: 10px;
            margin-left: 10px;
            color: $text-color;
          }
        }

        .card:hover {
          box-shadow: 0 1px 8px 0px $tertiary-color;
        }

        .card:active {
          box-shadow: 0 1px 8px 0px $text-color;
        }
      }
    }
  }
}
</style>
