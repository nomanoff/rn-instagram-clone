import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import AddNewPost from "../components/post/AddNewPost";

function NewPostScreen({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NewPostScreen;
