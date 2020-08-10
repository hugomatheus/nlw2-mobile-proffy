import React, { useState } from "react";
import { View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import { ScrollView } from "react-native-gesture-handler";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { useFocusEffect } from "@react-navigation/native";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("favorites").then((response) => {
        if (response) {
          setFavorites(JSON.parse(response));
        }
      });
    }, [])
  )
  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos"></PageHeader>
      <ScrollView
        style={styles.favoritesList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((favoriteTeacher: Teacher) => (
          <TeacherItem key={favoriteTeacher.id} teacher={favoriteTeacher} favorited={true} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;
