import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { version } from '../helpers/version.js'

/**
* @author Elio Neto
* @function About
**/
function About () {

 return(
  <View style={styles.container}>
    <Text style={styles.title}>Aplicação desenvolvida para demonstração em aula</Text>
    <Text style={styles.subTitle}>Agradecimentos: </Text>
    <Text style={styles.item}>RocketSeat</Text>
    <Text style={styles.item}>Sujeito Programador</Text>
    <Text style={styles.item}>GitHub </Text>
    <Text style={styles.subTitle}>Tecnologias: </Text>
    <Text style={styles.item}>JavaScript (Core)</Text>
    <Text style={styles.item}>NodeJS (BackEnd)</Text>
    <Text style={styles.item}>ReactJS (FrontEnd)</Text>
    <Text style={styles.item}>React Native (Mobile) </Text>
    <Text style={styles.item}>MongoDB (Database)</Text>
    <Text style={styles.item}>Expo </Text>
    <Text style={styles.subTitle}>Serviços Externos: </Text>
    <Text style={styles.item}>GitHub API </Text>
    <Text style={styles.item}>Google Maps </Text>
    <Text style={styles.footer}>Feito ❤ com por Elio Neto</Text>
    <Text style={styles.footer}>Versão: {version}</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   //alignItems: 'center',
   backgroundColor: '#4a2343',
   padding: 20
  },
  title: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 22,
  },
  subTitle: {
    color: '#fffa',
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  item: {
    color: '#fff6',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 2,
  },
  footer: {
    fontSize: 16,
    color: '#cedece',
    marginTop: 40,
    textAlign: 'center',
  }
})

export default About