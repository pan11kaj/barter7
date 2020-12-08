import React, { Component } from 'react';
import {View,Text, Image, BackHandler} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../compo/MyHeader';
import { ListItem } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default class MyExchenges extends Component{
constructor(){
    super();
    this.state={
     allBarters:[],exchengerId:firebase.auth().currentUser.email
    }
    this.requestRef=null
}
getAllBarters =()=>{
    this.requestRef = db.collection("all_exchenges").where("exchengedby" ,'==', this.state.exchengerId)
    .onSnapshot((snapshot)=>{
      var allBarters = []
      snapshot.docs.map((doc) =>{
        var barter = doc.data()
        barter["doc_id"] = doc.id
        allBarters.push(barter)
      });
      this.setState({
        allBarters : allBarters
      });
    })
  }
 key=(item,index)=>index.toString();
 renderItem=({item,i})=>{
     return(
         <ListItem
          key={i}
          title={item.item}
          subtitle={'exchengerid:-'+item.exchengedby}
          titleStyle={{justifyContent:'center',alignItems:'center',textAlign:'center'}}
        rightElement={<TouchableOpacity style={{backgroundColor:'red'}}><Text style={{color:'#fff'}}>Send Item</Text></TouchableOpacity>}
          bottomDivider
         />
     )
 }

componentDidMount(){
    this.getAllBarters()
}
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="My Barters"
                rightElement={<Image source={require('../bell.jpg')} style={{width:50,height:50}}/>}
                />
               <FlatList
               keyExtractor={this.key}
               data={this.state.allBarters}
               renderItem={this.renderItem}
               />

            </View>
        )
    }
}