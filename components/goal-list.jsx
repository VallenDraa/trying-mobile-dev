import { FlatList, Text } from "react-native";
import GoalItem from "./goal-item";

export default function GoalList({ data, deleteGoal }) {
  return (
    <FlatList
      data={data}
      ListEmptyComponent={() => (
        <Text className="text-center text-lg mt-6 text-slate-400">
          You have no goals
        </Text>
      )}
      ListFooterComponent={() =>
        data.length > 0 ? (
          <Text className="text-center text-sm mt-2 text-slate-400">
            End of goals
          </Text>
        ) : null
      }
      renderItem={(data) => (
        <GoalItem key={data.item.id} goal={data.item} onPress={deleteGoal} />
      )}
    />
  );
}
