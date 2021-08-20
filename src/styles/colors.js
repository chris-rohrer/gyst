
/**
 * Colors.js 
 */

 import { Appearance } from 'react-native';
 
 const colorScheme = Appearance.getColorScheme();
 const isDark = (colorScheme === 'dark');

export const Light = isDark ? 'coral' : 'lightcoral'
export const Dark = isDark ? 'lightcoral' : 'coral' 
export const Primary = isDark ? 'darkteal' : 'teal'
export const Secondary = isDark ? 'darkturquoise' : 'turquoise'
export const Font = isDark ? '#d3d3d3' : '#181818'
export const Link = isDark ? 'lightcoral' : 'coral'
export const Button = '#2196F3'
export const Accent = isDark ? 'lightcyan' : 'darkcyan'
export const Alert = 'firebrick'
export const Disabled = isDark ? 'darkgrey' : 'lightgrey'
export const Background = isDark ? '#181818' : 'white'
export const Header = isDark ? '#121212' : 'white'


/** NOTES
 * const MAIN_COLOR = 'white';

const someStyle = {
  padding: 5,
  margin: 5,
}

const styles = StyleSheet.create({
  usernameIcon: {
    color: MAIN_COLOR,
    ...someStyle,
  },
  generalStyle: {
    backgroundColor: 'white',
  }
})

// you can also combine styles in the component
// note that the latter style will override duplicated styles
<View style={[styles.usernameIcon, styles.generalStyle]} />
 */