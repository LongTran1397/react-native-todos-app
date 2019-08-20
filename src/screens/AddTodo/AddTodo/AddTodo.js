import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-elements";
import { useNavigation } from "react-navigation-hooks";
import Ionicons from "react-native-vector-icons/Ionicons";

const TodoItem = ({ item, addTodo, updateItem }) => {
  const { pop } = useNavigation();
  const [todo, setTodo] = useState(item ? item.title : "");
  const [pinned, setPinned] = useState(item ? item.isPinned : false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  let textInput = null;

  useEffect(() => {
    textInput.focus();
  }, [textInput]);

  const onChangeText = useCallback(
    (text) => {
      setError("");
      setSuccess("");
      setTodo(text);
    },
    [setTodo]
  );

  const onChangePinned = useCallback(() => {
    setPinned((prev) => !prev);
  }, [setPinned]);

  const onAddTodo = useCallback(() => {
    if (todo === "") {
      setError("Please enter your task!");
      setSuccess("");
      return;
    }

    if (item) {
      updateItem({
        ...item,
        title: todo,
        updatedAt: Date.now(),
        isPinned: pinned,
      });
      setTodo("");
      setSuccess("Updated success!");
    } else {
      addTodo({ title: todo, isPinned: pinned });
      setSuccess("Created success!");
    }
    pop();
  }, [addTodo, todo, updateItem, item, pop, pinned]);

  return (
    <View style={styles.container}>
      <View styles={styles.title}>
        <Text h4>Todo:</Text>
        <View style={styles.pin}>
          <TouchableOpacity onPress={onChangePinned}>
            <Ionicons
              size={30}
              name="logo-pinterest"
              color={pinned ? "#FF5A5F" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={(element) => (textInput = element)}
          placeholder="What you need to done?"
          onChangeText={onChangeText}
          value={todo}
          style={styles.input}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.success} h4>
          {success}
        </Text>
      </View>
      <View style={styles.button}>
        <Button title={item ? "UPDATE TODO" : "ADD TODO"} onPress={onAddTodo} />
      </View>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 20,
    right: 20,
  },
  title: {
    flexDirection: "row",
    position: "relative",
  },
  pin: {
    position: "absolute",
    top: 0,
    right: 20,
  },
  messageContainer: {
    marginTop: 20,
  },
  inputContainer: {
    paddingTop: 30,
  },
  input: {
    fontSize: 25,
    color: "#484848",
  },
  error: {
    color: "#FF5A5F",
    fontSize: 20,
  },
  success: {
    color: "#155724",
    fontSize: 20,
  },
});
