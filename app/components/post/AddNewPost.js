import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import routes from "../../navigation/routes";
import FormikPostUploader from "./FormikPostUploader";

function AddNewPost({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FormikPostUploader navigation={navigation} />
    </View>
  );
}

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.navigate(routes.HOME_SCREEN)}>
      <Image
        style={{ width: 30, height: 30 }}
        source={{
          uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
        }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW POST</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 30,
  },
});

export default AddNewPost;
