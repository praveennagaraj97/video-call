import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import { fontAwesomeTag } from './scripts';
import { App } from './views/App';
fontAwesomeTag();

ReactDOM.render(<App />, document.getElementById('root'));
