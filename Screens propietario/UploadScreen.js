import { StyleSheet, Text, View , TouchableOpacity , SafeAreaView , Alert , Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../db/firebase';
import { AsyncStorage } from 'react-native';

const UploadScreen = () => {
    const [image, setImage ] = useState(null);
    const [uploading , setUploading ] = useState(false);

const PickImage  = async () => {
    let result = await ImagePicker.lauchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypesOptions.All, 
        allowEditing : true,
        aspect : [4,3] ,
        quality : 1
    });

    const source = {uri: result.uri };
    console.log(source);
    setImage(source);
};

const uploadImage = async () => {
    setUploading (true); 
    const response = await fetch (image.uri)
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    try {
        await ref;
    } catch (e) {
        console.log(e);
    }
    setUploading(false)
    Alert.alert(
        'Photo uploaded'
    );
    setImage(null);
}
  return (
    <SafeAreaView style = {styles.container}>
        <TouchableOpacity style={styles.SelectButton} onPress={PickImage}>
            <Text style={styles.buttonText}>Pick an Image </Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={{width:300, height:300}} />} 
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage} >
            <Text style={styles.buttonText}>
                Upload Image
            </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default UploadScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        backgroundColor: '#000',
        justifyContent : 'center'
    },
    SelectButton : {
        borderRadius : 5,
        width: 150,
        height: 50,
        backgroundColor : 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadButton:{
        borderRadius : 5,
        width: 150,
        height: 50,
        backgroundColor : 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white' ,
        fontSize : 18,
        fontWeight: 'bold'
    },
    imageContainer :{
        marginTop : 30 ,
        marginBottom : 50 ,
        alignContent : 'center'
    }
})