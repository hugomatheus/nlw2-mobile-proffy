import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import api from "../../services/api";

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  whatsapp: string;
  subject: string;
  cost: number;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  async function handleToggleFavorite(){
    let favorites:Teacher[] = [];
    const response = await AsyncStorage.getItem('favorites');
    if(response){
      favorites = JSON.parse(response);
    }
    if(isFavorited){
      const favoriteIndex = favorites.findIndex((teacherItem: Teacher) => {
            return teacher.id === teacherItem.id
      });
      favorites.splice(favoriteIndex, 1);
      setIsFavorited(false);
    }else{
      favorites.push(teacher);
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }

  function handleLinkToWhatsapp() {
    api.post("/connections", {
      user_id: teacher.id,
    });
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=+55${teacher.whatsapp}`
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar,
          }}
        ></Image>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton onPress={handleToggleFavorite} style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}>
              {isFavorited ? <Image source={unfavoriteIcon} /> : <Image source={heartOutlineIcon} />}
          </RectButton>
          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon}></Image>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
