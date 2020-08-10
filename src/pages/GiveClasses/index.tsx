import React from "react";
import { View, Text, ImageBackground, Linking } from "react-native";

import backgroundImg from "../../assets/images/give-classes-background.png";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function GiveClasses() {
  const navigate = useNavigation();
  function handleNavigateToLandingPage() {
      // utilizei sem desestruturar o que vem de useNavigation, diferente na pagina LandingPage, para lembrar 
      // que quando possivel utilizar a destruturação pode ser de sua escolha
      //navigate.navigate('LandingPage');
      navigate.goBack();
      //Redirecionando para um link
      //Linking.openURL('https://www.google.com.br').catch(err => console.error("Couldn't load page", err));
  }

  

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundImg}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proff?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Text>
      </ImageBackground>
      <RectButton onPress={handleNavigateToLandingPage} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
