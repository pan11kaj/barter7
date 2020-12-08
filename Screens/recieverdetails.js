import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
export default class Rd extends Component{
    constructor(props){
        super(props);
        this.state={
         userid:firebase.auth().currentUser.email,
         username:"",
         recieverId      : this.props.navigation.getParam('details')["UserId"],
         requestId       : this.props.navigation.getParam('details')["request_id"],
         itemName        : this.props.navigation.getParam('details')["Item"],
         itemdescription     : this.props.navigation.getParam('details')["Des"],
         rName    : '',
         rContact : '',
         rAddress : '',
         rdocid : ''
        }
    }
 getRequesterDetails=()=>{
db.collection('AllUSERS').where('email','==',this.state.recieverId).get()
.then((snapshot)=>{
 snapshot.forEach(doc=>{
     var data = doc.data();
     this.setState({
         rName:data.Name,
         rContact:data.contact,
         rAddress:data.address,
     })
 })
})
db.collection('users').where('request_id','==',this.state.requestId).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
   this.setState({rdocid:doc.id})
    }) 
})
}
ItemStatus=()=>{
    db.collection('all_exchenges').add({
      'item':this.state.itemName,
      'requestby':this.state.recieverId,
       'rid':this.state.requestId,
       'exchengedby':this.state.userid,
    })
  }

getUserDetails(ui){
db.collection('AllUSERS').where('email','==',ui).get()
.then((snapshot)=>{
snapshot.forEach(doc=>{
    this.setState({
        username:doc.data().Name
    })
})
})
  }

componentDidMount(){
    this.getUserDetails(this.state.userid);
    this.getRequesterDetails();
}



    render(){
        return(
            <View style={{flex:1}}>
                <View>
                <Header     centerComponent={{ text:"Donate Barters", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
           leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.navigate('Home')}/>}/>
                </View>
                <View style={{flex:0.4}}>
                    <Card
                    title={"ITEM INFORMATIONS"}
                    titleStyle={{fontSize:23,color:"red",borderColor:'red',}}
                    >
                    <Card>
        <Text style={{textAlign:'center',fontSize:28}}> Item Name:-{this.state.itemName}</Text>
        <Text style={{textAlign:'center',fontSize:22}}> Description:-{this.state.itemdescription}</Text>
                    </Card>
 </Card>
                </View>
                <View style={{flex:0.4}}>
                    <Card
                    title={"Item Requester Information"}
                    titleStyle={{fontSize:21,color:"blue"}}
                    >
                        <Card>
        <Text style={{fontSize:23,color:'pink'}}>exchenger Name:{this.state.rName}</Text>     
        <Text style={{fontSize:23,color:'pink'}}>exchenger ID:   {this.state.requestId}</Text>
        <Text style={{fontSize:23,color:'pink'}}>exchenger contact:   {this.state.rContact}</Text>
        <Text style={{fontSize:23,color:'pink'}}>exchenger address:   {this.state.rAddress}</Text>
                        </Card>
                    
                    </Card>
                    <View style={{flex:0.3,justifyContent:'center',alignItems:'center'}}>
            {
              this.state.recieverId !== this.state.userid
              ?(
                <TouchableOpacity
                      style={styles.buton}
                    onPress={()=>{this.ItemStatus()
                    this.props.navigation.navigate('MyBarters')
                    }}>
                  <Text style={{color:'blue'}}>lets exchenge</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
                </View>
                     </View>
        )
    }
}
const styles = StyleSheet.create({
  buton:{
    backgroundColor:'red',borderColor:'green',borderRadius:40,marginTop:40
  }
})