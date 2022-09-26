import './style.css';
import render from './components/view/appView';
import listener from './components/controller/listener';
import { updateStateGarage } from './components/model/utils/helpers';

render();
await updateStateGarage();
listener();
