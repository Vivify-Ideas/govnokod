const MonocoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  // options...
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/settings.scss";'
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('monaco-editor-webpack-plugin')
      .use(MonocoEditorPlugin, [{
        languages: ['javascript', 'typescript', 'php', 'json', 'html']
      }])
  }
}