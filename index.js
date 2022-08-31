/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import TrackPlayer, { Capability } from 'react-native-track-player';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    'Non-serializable values were found in the navigation state',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Require cycle: node_modules/rn-fetch-blob/index.js',
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
    'new NativeEventEmitter',
    'Warning:'
]);
LogBox.ignoreAllLogs(); //Ignore all log notifications
mobileAds()
    .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
    })
    .then(() => {
        console.log('// Request config successfully set!')
    });
mobileAds()
    .initialize()
    .then(adapterStatuses => {
        console.log('// Initialization complete!')
    });

AppRegistry.registerComponent(appName, () => App);

// TrackPlayer.registerPlaybackService(() => require('./service.js'));
