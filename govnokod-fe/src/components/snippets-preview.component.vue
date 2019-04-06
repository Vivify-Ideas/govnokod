<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">
          {{getRandomSnippet.language}}
          <md-button
            class="md-raised md-primary app-randomize-btn"
            @click="getNewRandomSnippet"
          >
          Next &#9760;
          </md-button>
        </div>
      </md-card-header>

      <md-card-content>
        <monaco-editor
          class="editor"
          v-model="getRandomSnippet.content"
          :language="lowercasedLanguage"
          theme="vs-dark"
          :options="{fontSize: '15px'}"
        >
        </monaco-editor>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import GET_RANDOM_SNIPPET from '../graphql/get-random-snippet.gql'

export default {
  components: {
    MonacoEditor
  },
  data () {
    return {
      getRandomSnippet: {}
    }
  },

  apollo: {
    getRandomSnippet: {
      query: GET_RANDOM_SNIPPET,
      variables: {
        exclude: 1
      }
    },
  },

  computed: {
    lowercasedLanguage() {
      return (this.getRandomSnippet
        ? (this.getRandomSnippet.language || '')
        : ''
      ).toLowerCase();
    }
  },

  methods: {
    getNewRandomSnippet() {
      this.$apollo.queries.getRandomSnippet.refetch(
        {
          exclude: this.getRandomSnippet.id
        }
      );
    }
  },
}
</script>

<style scoped>
.app-randomize-btn {
  float: right;
}

.editor {
  height: 78vh;
}
</style>
