import React, { useState } from "react";
import {View, Text, StyleSheet, Button, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

export default function App() {
  const [image, setImage] = useState<any>('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      teste(result.assets[0].uri) 
    }
  };

  const teste = async (url: string) => {
      const form = new FormData()

      const data = {
        prediction: ""
      }

      const image = {
        name: 'teste',
        type: 'image/png',
        uri: url
      } as any

      form.append('image', image);
      form.append('data', JSON.stringify(data));


    await axios.post('',form, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Button title="Selectionar Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
