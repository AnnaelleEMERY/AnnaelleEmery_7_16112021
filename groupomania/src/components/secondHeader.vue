<!-- Ce header est pour les pages INSCRIPTION et CONNEXION -->
<!-- Ce header est pour les pages INSCRIPTION et CONNEXION -->
<!-- Ce header est pour les pages INSCRIPTION et CONNEXION -->
<!-- Ce header est pour les pages INSCRIPTION et CONNEXION -->
<!-- Ce header est pour les pages INSCRIPTION et CONNEXION -->

<template>
  <header class="bg-primary-color">
    <div class="div_header header_login">
      <div>
        <img
          class="groupomania-logo groupomania-logo__login"
          src="@/assets/groupomania_logos/icon-left-font-monochrome-white.png"
          alt="Logo blanc groupomania"
          width="200"
        />
      </div>
    </div>
  </header>
</template>

<script>
    
</script>

<style lang="scss">
.div_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0;
  width: 100%;

  i {
    @media (min-width: 768px) {
      font-size: 2.6rem;
    }
  }
}

.header_login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.groupomania-logo__login {
  @media (min-width: 576px) {
    width: 15rem;
  }
  @media (min-width: 768px) {
    width: 22rem;
  }
}
</style>