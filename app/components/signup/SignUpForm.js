import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import routes from "../../navigation/routes";

import { firebase, db } from "../../../firebase";

const SignUpFormSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  username: Yup.string().required().min(4, "Username is required"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters"),
});

const onSignUp = async (email, password, username) => {
  try {
    const authUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(" Account successfully created!");

    db.collection("user").add({
      owner_uid: authUser.user.uid,
      username: username,
      email: authUser.user.email,
      profile_picture: await getRandomProfilePicture(),
    });
  } catch (error) {
    Alert.alert("Something went wrong 🙁", error.message);
  }
};

const getRandomProfilePicture = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();

  return data.results[0].picture.large;
};

const SignUpForm = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={(values) =>
        onSignUp(values.email, values.password, values.username)
      }
      validationSchema={SignUpFormSchema}
      validateOnMount={true}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        values,
      }) => (
        <View style={styles.wrapper}>
          <View
            style={[
              styles.inputField,
              {
                borderColor:
                  values.email.length < 1 || Validator.validate(values.email)
                    ? "#ccc"
                    : "red",
              },
            ]}
          >
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholderTextColor="#444"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
            />
          </View>

          <View
            style={[
              styles.inputField,
              {
                borderColor:
                  values.username.length < 1 || values.username.length >= 4
                    ? "#ccc"
                    : "red",
              },
            ]}
          >
            <TextInput
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              placeholderTextColor="#444"
              placeholder="Username"
              autoCapitalize="none"
              textContentType="nickname"
              autoFocus={true}
            />
          </View>

          <View
            style={[
              styles.inputField,
              {
                borderColor:
                  1 > values.password.length || values.password.length >= 6
                    ? "#ccc"
                    : "red",
              },
            ]}
          >
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholderTextColor="#444"
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
              textContentType="password"
              autoFocus={true}
            />
          </View>

          <View style={{ alignItems: "flex-end", marginBottom: 30 }}></View>

          <Pressable
            titleSize={20}
            style={styles.button(isValid)}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          <View style={styles.signupContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
            >
              <Text style={{ color: "#6BB0f5" }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
    marginHorizontal: 20,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
  },

  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    minHeight: 42,
    borderColor: 4,
  }),

  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SignUpForm;
