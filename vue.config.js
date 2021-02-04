module.exports = {
  assetsDir: 'static-assets',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '^/api': {
        target: 'https://valuedash.scalevision.net/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  lintOnSave: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'CRM'
    }
  },
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ]
}
