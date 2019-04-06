<template>
  <div class="home">
    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <router-link
            :to="{ name: 'home' }"
          >
            <md-button class="md-button">
              <span class="app-logo-icon">
                💩
              </span>
              Govnokod
            </md-button>
          </router-link>
        </div>

        <div class="md-toolbar-section-end">
          <router-link
            :to="{ name: 'add-snippet' }"
          >
            <md-button
              class="md-raised"
              v-if="user"
            >
              + Add
            </md-button>
          </router-link>

          <md-button
            class="md-raised md-accent"
            @click="logout"
            v-if="user"
          >
            Logout
          </md-button>

          <router-link
            :to="{ name: 'login' }"
            v-else
          >
          <md-button
            class="md-button"
          >
            Login
          </md-button>

          </router-link>
        </div>
      </div>
    </md-toolbar>

    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions({
      unsetUser: 'logout'
    }),
    logout() {
      this.unsetUser()
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style lang="scss" scopped>
.app-logo-icon {
  font-size: 25px;
}

.auth {
  float: left;
}
</style>
