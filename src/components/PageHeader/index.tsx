import React, { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import backIcon from "../../assets/images/icons/back.png";
import logoImg from "../../assets/images/logo.png";

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, headerRight }) => {
  const { navigate } = useNavigation();
  function handleGoBack() {
    navigate("LandingPage");
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image resizeMode="contain" source={backIcon}></Image>
        </BorderlessButton>
        <Image resizeMode="contain" source={logoImg}></Image>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>
      {children}
    </View>
  );
};

export default PageHeader;
