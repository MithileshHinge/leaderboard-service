const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://api:3000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
        logLevel: 'debug',
      },
    },
  },
});
