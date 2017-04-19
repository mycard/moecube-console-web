import ReactDOM from 'react-dom';
import {browserHistory} from 'dva/router'
import createLoading from 'dva-loading'
import {message} from 'antd'
import dva from 'dva';
import './index.less';

// 1. Initialize
const app = dva({
  onError: (error) => {
    message.destroy();
    message.error(error.message);
  },
  history: browserHistory,
});

app.model(require("./models/Apps"));

app.model(require("./models/packages"));

app.model(require("./models/user"));

// app.model(require("./models/packages"));

app.model(require("./models/Common"));

app.model(require("./models/App"));

// 2. Plugins
// app.use({});
app.use(createLoading())

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));


const App = app.start()
ReactDOM.render(
  <App />,
  document.getElementById("root")
)

