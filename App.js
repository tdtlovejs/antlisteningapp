import React, {useEffect} from 'react';
import NavContainer from './src/components/NavContainer';
import AppContextProvider from './src/contexts/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import TrackPlayer, {Capability} from 'react-native-track-player';
// TrackPlayer.setupPlayer();
// TrackPlayer.updateOptions({
//     stopWithApp: true,
//     capabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.JumpForward,
//         Capability.JumpBackward,
//     ],
//     compactCapabilities: [Capability.Play, Capability.Pause],
// });

const App = () => {

  return (
      <AppContextProvider>
        <NavigationContainer>
          <NavContainer />
        </NavigationContainer>
      </AppContextProvider>
  );
};



export default App;
