import { useState } from "react";
import { Text, Pressable, TextInput, View } from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function GoalInput({ onAddGoal }) {
  const [text, setText] = useState("");

  return (
    <View className="mt-3">
      <TextInput
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder="Enter a new goal..."
        className="border border-slate-200 mb-2 px-2 py-1 rounded"
      />

      <StyledPressable
        className="rounded bg-blue-400 py-2 px-4 hover:bg-blue-300 active:bg-blue-500"
        onPress={() => {
          if (text === "") return;

          onAddGoal(text);

          setText("");
        }}
      >
        <Text className="text-center text-white">Add Goal</Text>
      </StyledPressable>
    </View>
  );
}
