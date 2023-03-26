import { View, Text, Pressable } from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function GoalItem({ goal, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#ddd" }}
      className="rounded border-b border-slate-100 py-2 px-3 bg-white"
    >
      {/* goal date */}
      <Text className="text-xs text-slate-400">
        {new Date(goal.date).toDateString()}
      </Text>

      {/* goal content */}
      <View className="flex-row items-center justify-between gap-2">
        <Text className="text-slate-700 text-lg font-medium flex-shrink">
          {goal.text}
        </Text>
        <StyledPressable
          onPress={() => onPress(goal.id)}
          className="rounded-full bg-red-400 py-2 px-4 hover:bg-red-300 active:bg-red-500"
        >
          <Text className="text-white">Delete</Text>
        </StyledPressable>
      </View>
    </Pressable>
  );
}
