import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Image, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import routes from "../../navigation/routes";

const PLACEHOLDER_IMAGE =
  "https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg";
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("Url is required"),
  caption: Yup.string().max(2200, "Maximum character limit!"),
});

function FormikPostUploader({ navigation }) {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
      onSubmit={(values) => {
        console.log("Values:", values);
        navigation.navigate(routes.HOME_SCREEN);
      }}
    >
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        isValid,
      }) => (
        <View>
          <View
            style={{
              margin: 15,
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMAGE,
              }}
            />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <TextInput
                style={{
                  color: "white",
                  fontSize: 22,
                }}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
                placeholder="Write a caption..."
                multiline={true}
                placeholderTextColor="gray"
              />
              {errors.caption && (
                <Text style={{ color: "red" }}>{errors.caption}</Text>
              )}
            </View>
          </View>
          <Divider width={0.3} orientation="vertical" />
          <View style={{ margin: 10 }}>
            <TextInput
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              style={{ color: "white", fontSize: 18, marginBottom: 4 }}
              placeholder="Enter Image Url"
              placeholderTextColor="gray"
              value={values.imageUrl}
              autoCapitalize="none"
            />
            {errors.imageUrl && (
              <Text style={{ color: "red" }}>{errors.imageUrl}</Text>
            )}

            <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormikPostUploader;
