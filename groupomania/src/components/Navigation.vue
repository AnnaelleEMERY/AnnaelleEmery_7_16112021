<template>
  <!-- semi page inscription et login -->
  <div id="nav">
    <div class="modal-overlay" v-if="showLogin">
      <button
        class="close btn btn-danger text-light"
        @click="showLogin = false"
      >
        X
      </button>
      <Login v-if="showLogin" />
    </div>
    <div class="modal-overlay" v-if="showRegister">
      <button
        class="close btn btn-danger text-light"
        @click="showRegister = false"
      >
        X
      </button>
      <Register v-if="showRegister" />
    </div>
    <div v-if="authenticated" class="user-img">
      <p class="username">{{ user[0].pseudo }}</p>
      <img
        class="avatar"
        v-bind:src="user[0].photo || 'https://picsum.photos/300/200?random'"
        alt="photo de profile"
      />
    </div>

    <!-- header -->
    <header class="nav bg-primary-color">
      <div class="nav_menu">
        <template class="template-items" v-if="authenticated">
          <!------- Affiché quand l'utilisateur est connecté ------->
          <b-nav-item class="item text-center">
            <router-link to="/"
              ><b-icon-house-door class="icone" />
              <span class="texte">Accueil</span>
            </router-link>
          </b-nav-item>

          <!-- Si l'utilisateur est admin -->
          <b-nav-item
            v-if="user[0].isAdmin === 1"
            to="/Administration"
            class="item"
          >
            <b-icon-gear class="icone" />
            <p class="texte">Admin</p>
          </b-nav-item>

          <!-- Pour modifier le profil -->
          <b-nav-item to="/Profile" class="item text-center">
            <b-icon-person class="icone" />
            <p class="texte">Profil</p>
          </b-nav-item>

          <!-- Pour se déconnecter -->
          <b-nav-item @click="logOut()" class="item text-center logout">
            <b-icon-box-arrow-right class="icone" />
            <p class="texte">Déconnecter</p>
          </b-nav-item>
        </template>

        <template class="template-items" v-else>
          <img
            class="groupomania-logo"
            src="@/assets/groupomania_logos/icon-left-font-monochrome-white.png"
            alt="Logo blanc groupomania"
            width="200"
          />
          <!-- Affiché si l'utilisateur n'est pas connu -->
          <b-nav-item
            class="item text-center text-white-color"
            @click="showRegister = true"
          >
            <b-icon-person-plus-fill class="icone" />
            <p class="texte">Inscription</p>
          </b-nav-item>
          <b-nav-item
            class="item text-center text-white-color"
            @click="showLogin = true"
          >
            <b-icon-box-arrow-in-right class="icone" />
            <p class="texte">Login</p>
          </b-nav-item>
        </template>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "Navigation",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      isAdmin: false,
      showLogin: false,
      showRegister: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      logOutAction: "auth/logout",
    }),
    logOut() {
      this.logOutAction().then(() => {
        this.$router.replace({
          name: "Home",
        });
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

#nav {
  width: 100%;
  padding: 0;
  margin: 0;
  .modal-overlay {
    background-color: #091f43b9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 150;
    .close {
      position: absolute;
      top: 40px;
      right: 30px;
      z-index: 110;
      background-color: white;
      width: 40px;
      height: 40px;
    }
  }

  .user-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border: 2px solid orange;
    border-radius: 30px;
    width: 10%;
    height: 90px;
    position: fixed;
    top: 10px;
    left: 10px;
    padding: none;
    background: linear-gradient(to bottom, orange, red);
    @media screen and (max-width: 768px) {
      width: 16%;
      height: 45px;
    }
    .avatar {
      max-width: 80%;
      padding: 1%;
      max-height: 60%;
      border-radius: 50%;
      background-color: violet;
    }
    .username {
      font-size: 1em;
      color: red;
      margin: 0;
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 4px solid $secondary-color;

    .nav_menu {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 90%;
      width: 65%;
        li {
          text-align: center;

          a {
            text-decoration: none;
          }
          
        }
      }
      .nav-collapse {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 60%;
        padding: 0;
        border-radius: 30px;
        @media screen and (max-width: 768px) {
          //width: 100%;
          padding: 2%;
          background: linear-gradient(to bottom, blue, grey);
        }
        .item-group {
          //margin-top: 2%;
          display: flex;
          width: 100%;
          height: 100%;
          //align-items: center;
          @media screen and (min-width: 768px) {
            justify-content: space-around;
            align-items: center;
          }
          a {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            .icone {
              color: red;
              font-size: 1em;
              @media screen and (min-width: 1500px) {
                font-size: 1.5em;
              }
            }
            .texte {
              color: red;
              font-size: 1em;
              margin: 2%;
              @media screen and (min-width: 1500px) {
                font-size: 1.5em;
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
</style>