import React, {Component} from 'react';
import axios from 'axios';
import Pokemon from './components/Pokemon';
import pokemon from 'pokemon';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export default class Main extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      isLoading: false,
      searchInput: '',
      name: '',
      pic: '',
      types: [],
      desc: '',
    };
  }

  render() {
    const {name, pic, types, desc, searchInput, isLoading} = this.state;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.continue}>
          <View style={styles.headContainer}>
            <View style={styles.textInputContainer}>
                <TextInput 
                style={styles.textInput}
                placeholder='Search Pokemon' 
                onChangeText={(searchInput) => this.setState({searchInput})}
                value={this.state.searchInput}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                title='Search' 
                color="#0064e1"
                onPress={this.searchPokemon}
                />
            </View>
          </View>
          <View style={styles.mainContainer}>
              {isLoading && <ActivityIndicator size="large" color="0064e1"/>}
              {!isLoading && (<Pokemon name={name} pic={pic} type={types} desc={desc}/>)}
            </View>
        </View>
      </SafeAreaView>
    );
  }

  searchPokemon = async () =>{
      try{
        const pokemonID = pokemon.getId(this.state.searchInput)
        this.setState({isLoading:true})

        const { data: pokemonData } = await axios.get(`${POKE_API_BASE_URL}/pokemon/${pokemonID}`)
        const { data: pokemonSpecieData } = await axios.get(`${POKE_API_BASE_URL}/pokemon-species/${pokemonID}`)

        const { name, sprites, types } = pokemonData
        const { flavor_text_entries } = pokemonSpecieData

        this.setState({
            name,
            pic: sprites.front_default,
            types: this.getType(types),
            desc: this.getDescription(flavor_text_entries),
            isLoading: false
        })

      }catch(err){
        Alert.alert('Error', 'Pokemon not found'+ err)
        this.setState({isLoading: false})
      }
  }

  getType = (types) => types.map(({slot,type}) => ({
          id: slot,
          name: type.name 
      }))


  getDescription = (entries) => entries.find((item) => item.language.name == 'en').flavor_text;
  
}

const styles = StyleSheet.create({
      wrapper:{
          flex:1
      },
      continue:{
          flex:1,
          padding:20,
          backgroundColor: '#f5fcff',
      },
      headContainer:{
          flex:1,
          flexDirection: 'row',
          marginTop: 100
      },
      textInputContainer:{
          flex:2
      },
      buttonContainer:{
          flex:1,
          height:35,
          backgroundColor:'#78c850'
      },
      mainContainer:{
          flex: 9
      },
      textInput:{
          height:35,
          marginBottom:10,
          borderColor: '#ccc',
          borderWidth: 1,
          backgroundColor: '#eaeaea',
          padding: 5
      }
})
