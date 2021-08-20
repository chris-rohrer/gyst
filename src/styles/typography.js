
/**
 * Typography.js
 */

 import * as Colors from './colors'

 export const Title = 'lightcoral'

 const Heading = {
   color: Colors.Font,
   fontWeight: 'bold',
   margin: 30,
 }

 export const H1 = {
   ...Heading,
    fontSize: 50,
  }

  export const H2 = {
    ...Heading,
    fontSize: 40,
  }

  export const H3 = {
    ...Heading,
    fontSize: 25,
  }

  export const Body = {
    color: Colors.Font,
}

export const Emphasis = {
    fontWeight: 'bold',
    color: Colors.Font,
}


 export const Modal = {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }

export const Button = {
    color: "white",
    fontWeight: "bold",
}

export const Summary = {
    color: Colors.Font,
    fontSize: 40,
}

export const Action = {
  fontSize: 16,
  backgroundColor: 'transparent',
  padding: 10,
}