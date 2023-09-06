module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false
    }
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8090, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false
  },
  transpileDependencies: ["@coreui/utils", "@coreui/vue"]
};
