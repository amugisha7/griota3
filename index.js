/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import oldApp from './oldApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
