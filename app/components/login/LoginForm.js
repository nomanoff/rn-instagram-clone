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

import { firebase } from "../../../firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import routes from "../../navigation/routes";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 8 characters"),
});

const onLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("Successfull!");
  } catch (err) {
    Alert.alert(err.message);
  }
};

const LoginForm = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => onLogin(values.email, values.password)}
      validationSchema={LoginFormSchema}
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
              placeholder="Phone number, username or email"
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

          <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
            <Text style={{ color: "#6BB0f5" }}>Forgot password?</Text>
          </View>

          <Pressable
            titleSize={20}
            style={styles.button(isValid)}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>

          <View style={styles.signupContainer}>
            <Text>Don't have an accoung? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}
            >
              <Text style={{ color: "#6BB0f5" }}>Sing Up</Text>
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

export default LoginForm;
