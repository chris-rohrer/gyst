import * as Colors from './colors'
import * as Spacing from './spacing'
import * as Typography from './typography'
import * as Buttons from './buttons'

export { Typography, Spacing, Colors, Buttons }

import { StyleSheet} from 'react-native';

const Styles = StyleSheet.create({

    toppanel: {
        alignSelf: 'stretch',
        alignItems: 'center'
    },

    modalView: {
      margin: 20,
      backgroundColor: Colors.Background,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  
    input: {
      borderWidth: 2,
      borderColor: Colors.Font,
      alignSelf: 'stretch',
      marginHorizontal: 32,
      marginVertical: 6,
      paddingHorizontal: 20,
      height: 45,
      borderRadius: 6,
      color: Colors.Font,
    },

    Picker: {
      height: 250, 
      width: 250
    },

    PickerItem: {
      color: Colors.Font,
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },

    label: {
      flexDirection: "row",
      backgroundColor: '#2196F3',
      alignSelf: 'stretch',
      padding: 15,
      margin: 5,
      borderRadius: 4,
    },

    leftAction: {
      flex: 1,
      backgroundColor: '#497AFC',
      justifyContent: 'center',
    },
    rightAction: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    }

  });

  export default Styles