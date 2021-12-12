<template>
  <div id="app">
    <principalHeader />
    <router-view />
    <footer class="bg-primary-color">
      <div class="conditions">
        <a class="link-footer" href="#">Mentions légales</a>
        <a class="link-footer" href="#">Conditions d'utilisation</a>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import principalHeader from "@/components/principalHeader.vue";

export default {
  name: "App",
  components: {
    principalHeader,
  },
};
</script>

<style lang="scss">
$primary-color: #091f43;
$secondary-color: #d1515a;
$tertiary-color: #d8d8d8;
$white-color: #ffffff;
$text-color: #131e2a;

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

textarea {
  resize: none;
  width: 100%;
  border-radius: 5px;
  border: none;

  margin-top: 2rem;

  &::placeholder {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  &:focus-visible {
    outline: none;
  }
}


.home {
  padding: 2rem 2rem;

  @media (min-width: 992px) {
    padding: 2rem 10rem;
  }

  @media (min-width: 1280px) {
    padding: 2rem 20rem;
  }

  @media (min-width: 1920px) {
    padding: 2rem 35rem;
  }

  @media (min-width: 3000px) {
    padding: 2rem 50rem;
  }
}

h1 {
  font-size: clamp(2.5rem, calc(2.5rem + ((1vw - 0.48rem) * 2.0833)), 4rem);
}

h2 {
  font-size: clamp(2.3rem, calc(2.3rem + ((1vw - 0.48rem) * 0.9722)), 3rem);
}

h3 {
  font-size: clamp(2rem, calc(2rem + ((1vw - 0.48rem) * 1.1111)), 2.8rem);
}

p {
  font-size: 1.4rem;
  margin-bottom: 0 !important;
  margin: 0;
  font-weight: 600;
}

i {
  font-size: 1.8rem;
}

a {
  color: $white-color !important;
  font-size: 1.4rem;
}

.text-white-color {
  color: $white-color;
}

.text-primary-color {
  color: $primary-color;
}

.text-secondary-color {
  color: $secondary-color;
}

.text-tertiary-color {
  color: $tertiary-color;
}

.bg-primary-color {
  background-color: $primary-color;
}

.bg-secondary-color {
  background-color: $secondary-color;
}

.bg-tertiary-color {
  background-color: $tertiary-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $secondary-color !important;

    &.router-link-exact-active {
      color: $secondary-color;
    }
  }
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: -moz-available;
  width: -webkit-fill-available;
  padding: 2.5rem 1rem;
  border-top: 4px solid $secondary-color;

  .conditions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 576px) {
      flex-direction: row;
    }

    .link-footer:first-child {
      margin-bottom: 1rem;

      @media (min-width: 576px) {
        margin-bottom: 0;
        margin-right: 5rem;
      }
    }
  }
}
</style>
