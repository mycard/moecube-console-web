import ReactDOM from 'react-dom';
import { browserHistory } from 'dva/router'
import dva from 'dva';
import './index.less';


import { IntlProvider, addLocaleData } from 'react-intl';


// 1. Initialize
const app = dva({
    history: browserHistory
});

app.model(require("./models/Apps"));

app.model(require("./models/user"));

app.model(require("./models/Common"));

app.model(require("./models/App"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import localeData from '../i18n.json'


addLocaleData([...en, ...zh])
const language = navigator.language || (navigator.languages && navigator.languages[0]) || navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.zh;

const App = app.start()
ReactDOM.render(
  <IntlProvider locale={ language } messages={ messages }>
    <App />
  </IntlProvider>, 
  document.getElementById("root")
)

