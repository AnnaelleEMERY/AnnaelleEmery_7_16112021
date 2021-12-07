<template>
  <header class="bg-primary-color">
    <div class="div_header">
      <div>
        <router-link to="/"
          ><img
            class="groupomania-logo"
            src="@/assets/groupomania_logos/icon-left-font-monochrome-white.png"
            alt="Logo blanc groupomania"
            width="200"
          />
        </router-link>
      </div>

      <router-link to="/"><i class="fas fa-home text-white-color"></i></router-link>

      <router-link class="header-user d-flex" to="/user/update/:userId">
        <p class="userphoto">PHOTO de l'utilisateur</p>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'principalHeader',
}
</script>

<style lang="scss">

header {
  padding: 1rem 0rem;
  border-bottom: 4px solid #d1515a;

  @media (min-width: 992px) {
    padding: 0rem;
  }
}

.div_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0;

  i {
    @media (min-width: 768px) {
      font-size: 2.6rem;
    }
  }
}

.groupomania-logo {
  width: 6rem;

  @media (max-width: 575px) {
    width: 10rem;
  }
  @media (min-width: 576px) {
    width: 15rem;
  }
  @media (min-width: 768px) {
    width: 22rem;
  }
}

.username {
  margin-right: 1rem;
}
</style>