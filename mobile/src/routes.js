import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'
import About from './pages/About'

import SignIn from './pages/signIn'
import SignUp from './pages/signUp'

const Routes = createAppContainer(
  createStackNavigator({
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: "Acesso Hunter"
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Cadastro Hunter"
      }
    }, 
    Main: {
      screen: Main,
      navigationOptions: {
        title: "Dev's Hunter Map"
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        title: "Sobre o seu Dev's Hunter"
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github'
      }
    },
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#4a2343',
      }
    }
  })
)

export default Routes