import { useGestureHandlerRef } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { firebase } from "../../firebase";

import { SignedInStack, SignedOutStack } from "./NavigationStacks";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => userHandler(user)),
    []
  );

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
