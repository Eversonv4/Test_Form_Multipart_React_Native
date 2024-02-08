import React, { useState } from "react";
import {View, Text, StyleSheet, Button, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

export default function App() {
  const baseUrl = "http://192.168.0.103:8002/api/";
  const [image, setImage] = useState<any>('');
  const [message, setMessage] = useState<any>('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [9, 16],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      teste(result.assets[0].uri) 
    }
  };

  const teste = async (url: string) => {
    const form = new FormData()

    const data = {"data":[{"exercise_id":5,"prediction":"9 + 7 = 1 6","coordinates":{"top_left":{"x":343,"y": 381},"bottom_right":{"x": 580,"y": 756}}}]}

    const image = {
      name: 'teste',
      type: 'image/png',
      uri: url
    } as any

    form.append('image', image);
    form.append('data', JSON.stringify(data));

    const response = await fetch(
        baseUrl + "solutions/student/3/exercise-list/6/skills/6", {
          method: "POST",
          headers: {
            'Content-Type': "multipart/form-data",
            'Authorization': "Bearer 1|vx0Iz8lN0G2FXciYU1C32QWtUVeF85yIkGYYkzKa261edc2f"
          },
          body: form
        }
      )
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log("ERRINHO -> ", error));

    console.log(response);
    return;

    await axios.post('',form, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
  }

  async function testAPI() {
    console.log("ENTROU");
    const response = await fetch(baseUrl + "status")
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log("ERRO -> ", error));

  }

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Button title="Selectionar Image" onPress={pickImage} />
      <View style={{height: 20}}></View>
      <Button title="test connection with API" onPress={testAPI} />
      {image && <Image source={{ uri: image }} style={{ width: 240, height: 300 }} />}
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

  btn: {
    marginTop: 50
  }
});
