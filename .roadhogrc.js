let publicPath = 'https://cdn01.moecube.com/console/';

export default {
  publicPath,
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        "babel-plugin-transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        "babel-plugin-transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    }
  }
}
