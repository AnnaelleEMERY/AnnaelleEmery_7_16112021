<template>
  <div class="home">
    <h1>Bienvenue !</h1>
    <div class="bg-tertiary-color post">
      <div class="userPseudoPost">
        <p class="userPseudoPost__photo">PHOTO</p>
        <p class="text-secondary-color">Pseudo</p>
      </div>
      <textarea id="message" name="messagePost" placeholder="Entrez votre message ici ;)"></textarea>
    </div>
  </div>
</template>

<script>
// mettre les importations ici

export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss">
.post {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .userPseudoPost {
    display: flex;
    flex-direction: row;
    align-self: start;

    &__photo {
      margin-right: 1.5rem;
    }
  }
}
</style>
