import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Animated, Keyboard, } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'
import { connect, disconect } from '../services/socket'

/* Imports menu */
import ActionButton from 'react-native-action-button';

function Main ({ navigation }) {
  const [devs, setDevs] = useState([])
  const [currentRegion, setCurrentRegion] = useState(null)
  const [techs, setTechs] = useState('')
  const [Maxdistance, setMaxDistance] = useState('1000')

  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync()

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })

      }
    }
    loadInitialPosition()
  }, [])

  function keyboardDidShow(){
    setIsOpen(true)
  }

  function keyboardDidHide(){
    setIsOpen(false)
  }

  function setupWebSocket (){
    const { latitude, longitude } = currentRegion

    connect(
      latitude,
      longitude,
      techs,
      Maxdistance
    )
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion
    //setTechs(techs.toUpperCase())
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs: techs.toUpperCase(),
        Mdistance: Maxdistance
      }
    })
    setDevs(response.data.devsArray)
    setupWebSocket()
  }

  function handleRegionChanged (region){
    setCurrentRegion(region)
  }

  if (!currentRegion) {
    return null
  }

  return( 
    <>
    <MapView 
      onRegionChangeComplete={handleRegionChanged} 
      initialRegion={currentRegion} 
      style={styles.map}
    >
     {devs.map( dev => (
       <Marker
        key={dev._id}
        coordinate ={{
          latitude: dev.location.coordinates[1],
          longitude: dev.location.coordinates[0]
        }}
       >
         <Image
          style={styles.avatar}
          source={{ uri: dev.avatar_url }}
         />
         <Callout onPress={() => {
           navigation.navigate('Profile', { github_username: dev.github_username })
         }}>
           <View style={styles.callout}>
              <Text style={styles.devName}>{dev.name}</Text>
              <Text style={styles.devBio}>{dev.bio}</Text>
              <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              <Text style={styles.devDist}>Distancia: {parseInt(dev.distance)} metros</Text>
              <Text style={styles.links}>Clique para acessar o perfil no Github</Text>
           </View>
         </Callout>
       </Marker>
     ))} 
    </MapView>
{!isOpen ? <>
  <View style={styles.searchForm}>
    <TextInput 
      style={styles.searchInput}
      placeholder='Buscar devs por techs...'
      placeholderTextColor='#999'
      autoCapitalize='words'
      autoCorrect={false}
      value={techs}
      onChangeText={ setTechs }
    />
    <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
      <MaterialIcons name='my-location' size={20} color='#fff' />
    </TouchableOpacity>
  </View>
</> 
: 
<>
  <View style={styles.searchFormOpen}>
    <TextInput 
      style={styles.searchInput}
      placeholder='Buscar devs por techs...'
      placeholderTextColor='#999'
      autoCapitalize='words'
      autoCorrect={false}
      value={techs}
      onChangeText={ setTechs }
    />
    <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
      <MaterialIcons name='my-location' size={20} color='#fff' />
    </TouchableOpacity>
  </View>
</>}
      
      <ActionButton buttonColor="#4a2343" style={styles.menu}>
        <ActionButton.Item buttonColor='#9baab6' title="Informações" onPress={() => { navigation.navigate('About') }}>
          <Text style={styles.actionButtonIcon}>Sobre</Text>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#9b59b6' title="2Km de distância" onPress={() => setMaxDistance(2000)}>
          <Text style={styles.actionButtonIcon}>2km</Text>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="20Km de distância" onPress={() => setMaxDistance(20000)}>
          <Text style={styles.actionButtonIcon}>20km</Text>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="100Km de distância" onPress={() => setMaxDistance(100000)}>
          <Text style={styles.actionButtonIcon}>100km</Text>
        </ActionButton.Item>
      </ActionButton>
    </>
  )
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devDist: {
    color: '#636',
    marginTop: 5
  },
  links: {
    color: '#034c',
    marginTop: 5,
    fontSize: 10
  },
  devTechs: {
    marginTop: 5,
    textTransform: 'capitalize'
  },
  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchFormOpen: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  searchInputDistance: {
    height: 50,
    marginLeft: 5,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4a2343',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },
  actionButtonIcon: {
    fontSize: 15,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    bottom: 50,
    right: -10
  }
})

export default Main