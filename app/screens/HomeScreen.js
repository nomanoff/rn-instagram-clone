import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import Stories from "../components/home/Stories";
import { POSTS } from "../data/post";
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import { db } from "../../firebase";

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [sth, setSth] = useState([]);

  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    margin: 0,
    padding: 0,
  },
});

export default HomeScreen;
