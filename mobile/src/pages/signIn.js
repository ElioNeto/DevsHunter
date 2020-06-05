import React, { useEffect, useState } from 'react'
import { 
  KeyboardAvoidingView, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native'

import api from '../services/api'
import { version } from '../helpers/version.js'

export default function SignIn({navigation}) {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}))
  const [opacity] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({x: 200, y: 200}))

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000
      })
    ]).start()
  }, [])

  function keyboardDidShow(){
    setIsOpen(true)
    Animated.parallel([
      Animated.timing(
        logo.x, {
          toValue: 100,
          duration: 300
        }
      ),
      Animated.timing(
        logo.y, {
          toValue: 100,
          duration: 300
        }
      ),
    ]).start()
  }

  function keyboardDidHide(){
    setIsOpen(false)
    Animated.parallel([
      Animated.timing(
        logo.x, {
          toValue: 200,
          duration: 300
        }
      ),
      Animated.timing(
        logo.y, {
          toValue: 200,
          duration: 300
        }
      ),
    ]).start()
  }

  async function login(){

    if(!user){
      alert('Você não informou o usuário')
      return
    }
    if(!password){
      alert('Você não informou a senha')
      return
    }
  
    const response = await api.get(`/login`, {
      params: {
        user,
        password
      }
    })
    if(response.data === '300'){
      alert('senha incorreta')
      setPassword('')
    }
    if(response.data === '200'){
      //alert('Login efetuado com sucesso')
      setPassword('')
      setUser('')
      navigation.navigate('Main')
    }
    if(response.data === '404'){
      alert('usuário não encontrado')
      setPassword('')
      setUser('')
    }

  } 

  return (
    <KeyboardAvoidingView style={styles.background} >
      <View style={styles.containerLogo}>
        <Animated.Image
          source={require('../../assets/HunterDevsLogo.png')}
          style={{
            height: logo.y,
            width: logo.x,
            borderRadius: 500,
            borderWidth: 4,
            borderColor: '#fff'
          }}
        />
        {!isOpen ? <Text style={styles.version}>Versão {version}</Text> : <></>}
      </View>

{ !isOpen ?   
      <Animated.View 
        style={[
          styles.container, {
            opacity: opacity,
            transform: [{
              translateY: offset.y
            }]
          }]}
      >
        <TextInput
          style={styles.input}
          placeholder='Usuário'
          autoCorrect={false}
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity  style={styles.btnSubmit} onPress={login} >
          <Text  style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>  

        <TouchableOpacity style={styles.btnRegister} onPress={() => { navigation.navigate('SignUp') }}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>  
      </Animated.View >
:
      <Animated.View 
        style={[
          styles.containerOpen, {
            opacity: opacity,
            transform: [{
              translateY: offset.y
            }]
          }]}
      >
        <TextInput
          style={styles.input}
          placeholder='Usuário'
          autoCorrect={false}
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity  style={styles.btnSubmit} onPress={login} >
          <Text  style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>  

        <TouchableOpacity style={styles.btnRegister} onPress={() => { navigation.navigate('SignUp') }}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>  
      </Animated.View >
}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a2343'
  },
  version: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 60
  },
  containerOpen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 260
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    height: 50,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit: {
    backgroundColor: '#35aaff',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText: {
    color: '#fff',
    fontSize: 18
  },
  btnRegister: {
    marginTop: 10
  },
  registerText: {
    color: '#fff',
    fontSize:16,
    paddingTop: 3
  }
})