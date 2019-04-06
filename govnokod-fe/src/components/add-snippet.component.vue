<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">
          <md-field
            class="app-select-language"
          >
            <label for="language">Language</label>
            <md-select
              v-model="newSnippet.language"
              name="language"
              id="language"
            >
                <md-option
                  v-for="language in languages"
                  :key="language"
                  :value="language"
                >
                  {{ language }}
                </md-option>
            </md-select>
          </md-field>

        </div>
      </md-card-header>

      <md-card-content>
        <monaco-editor
          class="editor"
          v-model="newSnippet.content"
          :language="lowercasedLanguage"
          theme="vs-dark"
          :options="{fontSize: '15px'}"
        >
        </monaco-editor>
      </md-card-content>

      <md-card-actions>
        <md-button
          class="md-raised md-primary app-randomize-btn"
          @click="save"
        >
        Save
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import ADD_SNIPPET_MUTATION from '../graphql/add-snippet.gql'
import { LANGUAGES } from './../constants'

export default {
  components: {
    MonacoEditor
  },
  data () {
    return {
      loading: false,
      languages: LANGUAGES,
      newSnippet: {
        content: '',
        language: 'JavaScript'
      }
    }
  },

  computed: {
    lowercasedLanguage() {
      return (this.newSnippet
        ? (this.newSnippet.language || '')
        : ''
      ).toLowerCase();
    }
  },

  methods: {
    save() {
      this.$apollo.mutate({
        mutation: ADD_SNIPPET_MUTATION,
        variables: {
          snippet: this.newSnippet.content,
          language: this.newSnippet.language,
        }
      }).then(() => {
        this.$router.push({
          name: 'home'
        })
      })
    }
  },
}
</script>

<style scoped>
.app-select-language {
  width: 200px;
}

.editor {
  height: 68vh;
}
</style>
