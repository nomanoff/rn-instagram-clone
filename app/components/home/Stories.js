import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { USERS } from "../../data/users";

function Stories() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={styles.userContainer}>
            <Image style={styles.story} source={{ uri: story.image }} />
            <Text style={styles.username}>
              {story.user.length > 10
                ? story.user.slice(0, 10).toLowerCase() + "..."
                : story.user}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    color: "white",
  },
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  userContainer: {
    alignItems: "center",
  },
  username: {
    color: "#fff",
    alignItems: "center",
  },
});

export default Stories;
