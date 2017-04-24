let publicPath = 'https://cdn01.moecube.com/console/';

const API_ROOT = {
  development: 'http://localhost:8001',
  test: 'http://114.215.243.95:8001',
  production: 'https://moecube.com/console'
};
const RETURN_SSO = {
  development: `http://localhost:8000/loginCallback`,
  test: `http://114.215.243.95:8000/loginCallback`,
  production: `https://moecube.com/console/loginCallback`
};

let defineConf = {
  apiRoot: API_ROOT[process.env['ENV']],
  returnSSO: RETURN_SSO[process.env['ENV']]
};

export default {
  publicPath,
  "entry": "src/index.js",
  define: defineConf,
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        "babel-plugin-transform-decorators-legacy",
        ["import", {"libraryName": "antd", "style": "css"}]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        "babel-plugin-transform-decorators-legacy",
        ["import", {"libraryName": "antd", "style": "css"}]
      ]
    }
  }
}
