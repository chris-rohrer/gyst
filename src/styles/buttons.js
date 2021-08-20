import * as Colors from './colors'

export const someStyle = {
    padding: 5,
    margin: 5,
  }

export const Button = {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 32,
    marginVertical: 6,
    borderRadius: 6,
    //borderWidth: 2,
    backgroundColor: Colors.Button
  }

export const Disabled = {
    ...Button,
    backgroundColor: Colors.Disabled

}

export const Alert = {
  ...Button,
  backgroundColor: Colors.Alert

}

export const Open = {
    ...Button,
    backgroundColor: "#F194FF",
  }

export const Close = {
    ...Button,
    backgroundColor: "#2196F3",
  }