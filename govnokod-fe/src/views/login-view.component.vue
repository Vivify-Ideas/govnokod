<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

    <div class="title">
        <!-- <img src="https://vuematerial.io/assets/logo-color.png"> -->
        <span class="app-logo">
          💩
        </span>
        <div class="md-title">GovnoKod</div>
        <div class="md-body-1">Shit happens</div>
    </div>

    <div class="form">
        <md-field>
        <label>E-mail</label>
        <md-input v-model="login.email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
        <label>Password</label>
        <md-input v-model="login.password" type="password"></md-input>
        </md-field>
    </div>

    <div class="actions md-layout md-alignment-center-space-between">
        <router-link
          :to="{ name: 'register' }"
        >
          Create Account
        </router-link>
        <router-link
          :to="{ name: 'home' }"
        >
          Go Back
        </router-link>
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
    </div>

    <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    auth() {
      this.loading = true
      this.$store.dispatch('login', this.login).then(() => {
        this.loading = false
        this.$router.push({
          name: 'home'
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
};
</script>

<style lang="scss">
.app-logo {
  font-size: 75px;
}

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      border: none;
      -webkit-text-fill-color: yellow;
      box-shadow: 0 0 0px 1000px rgba(14, 173, 201, 0.288) inset;
      transition: background-color 5000s ease-in-out 0s;
    }
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
