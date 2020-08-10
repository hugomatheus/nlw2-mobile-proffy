import React, { useState} from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import api from "../../services/api";

function TeacherList() {
  const [isFiltersVisible, setIsFilterVisible] = useState(false);
  const [subject, setSubject] = useState("PHP");
  const [week_day, setWeekDay] = useState("1");
  const [time, setTime] = useState("11:00");
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  function handleToggleFilter() {
    setIsFilterVisible(!isFiltersVisible);
  }

  
  async function searchClasses() {
    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }
  
  async function handleFiltersSubmit() {
    loadFavorites();
    searchClasses();
    setIsFilterVisible(false);
  }

  
  function loadFavorites(){
    //console.log('loadFavorites');
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritesTeachers = JSON.parse(response);
        const favoritesTeachersIds = favoritesTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        //console.log(favoritesTeachersIds);
        setFavorites(favoritesTeachersIds);
      }
    });
  }

  

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilter}>
            <Feather name="filter" size={20} color="#FFF"></Feather>
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              onChangeText={(text) => setSubject(text)}
            ></TextInput>
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  onChangeText={(text) => setWeekDay(text)}
                ></TextInput>
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  onChangeText={(text) => setTime(text)}
                ></TextInput>
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Feather name="search" size={20} color="#FFF"></Feather>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />;
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
