import React from 'react'
import {View,Text, Image, FlatList, StyleSheet} from 'react-native'

const Pokemon = ({name, pic, type, desc}) => { 
    return(
    <View style={styles.mainDetails}>
        <Image style={styles.image} source={{uri: pic}} resizeMode="contain" />
        <Text style={styles.mainText}>{name}</Text>
        <FlatList
            columnWrapperStyle={styles.types}
            numColumns={2}
            data={type}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
            <View style={[styles[item.name],styles.type]}>
                <Text style={styles.typeText}>{item.name}</Text>
            </View>
            )}
        />
        <View style={styles.description}>
            <Text>{desc}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    mainDetails: {
        padding: 30,
        alignItems: 'center'
    },
    image: {
        width:100,
        height: 100
    },
    mainText:{
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description:{
        marginTop:10
    },
    types:{
        flexDirection: 'row',
        marginTop: 20
    },
    type: {
        padding:5,
        width:100,
        alignItems:'center'
    },
    typeText: {
        color: '#fff'
    },
    normal:{
        backgroundColor: '#8a8a59'
    },
    fire:{
        backgroundColor: '#f09030'
    },
    water:{
        backgroundColor: '#6890f0'
    },
    electric:{
        backgroundColor: '#f8d030'
    },
    grass:{
        backgroundColor:'#78c850'
    },
    ice:{
        backgroundColor: '#98d8d8'
    },
    fighting:{
        backgroundColor: '#c03028'
    },
    posion:{
        backgroundColor:'#a040a0'
    },
    ground:{
        backgroundColor:'#e9c968'
    },
    flying:{
        backgroundColor: '#a890f0'
    },
    phychic:{
        backgroundColor: '#f85888'
    },
    bug:{
        backgroundColor:'#a8b820'
    },
    rock:{
        backgroundColor:'#b8a038'
    },
    ghost:{
        backgroundColor:'#705898'
    },
    dragon:{
        backgroundColor:'#7038f8'
    },
    steel:{
        backgroundColor:'#b8b8d0'
    },
    fairy:{
        backgroundColor:'#e898e8'
    }
})

export default Pokemon