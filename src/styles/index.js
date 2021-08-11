import * as Colors from './colors'
import * as Spacing from './spacing'
import * as Typography from './typography'

// export { Typography, Spacing, Colors, Buttons }

import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
    },
  
    input: {
      borderWidth: 1,
      alignSelf: 'stretch',
      marginHorizontal: 32,
      marginVertical: 6,
      paddingHorizontal: 20,
      height: 45,
      borderRadius: 6
    },
  
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginHorizontal: 32,
      marginVertical: 6,
      borderRadius: 2,
      borderWidth: 2,
    },

    buttonOFF: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginHorizontal: 32,
      marginVertical: 6,
      borderRadius: 2,
      borderWidth: 2,
      backgroundColor: 'grey',
    },

    h1: {
      fontSize: 40,
      margin: 25
    },
  
    summary: {
      fontSize: 40,
    },
  
    mainmenu: {
      alignSelf: 'stretch',
      padding: 50
    },
  
    buttontext: {
      fontWeight: 'bold'
    },

    toppanel: {
        alignSelf: 'stretch',
        alignItems: 'center'
    }
  });

  export default styles