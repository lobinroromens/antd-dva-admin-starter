import './index.html';
import './index.less';
import dva, { connect } from 'dva';

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('./models/user'));
app.model(require('./models/addressList'));

// 3. Router
app.router(require('./router'));
// 4. Start
app.start(document.getElementById('root'));
