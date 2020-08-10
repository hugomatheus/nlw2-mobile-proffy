import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8257E5",
    justifyContent: "center",
    padding: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },
  description: {
    fontFamily: "Archivo_400Regular",
    color: "#d4c2ff",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 24,
    maxWidth: 240,
  },
  okButton: {
    backgroundColor: "#04d361",
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 40,
    // marginVertical = marginTop e marginBottom
  },
  okButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Archivo_700Bold",
  },
});

export default styles;
