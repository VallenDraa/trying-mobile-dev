import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoalInput from "./components/goal-input";
import GoalList from "./components/goal-list";

export default function App() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [goalList, setGoalList] = useState([]);

  // load all saved goals
  useEffect(() => {
    AsyncStorage.getItem("goals")
      .then((data) => {
        const savedGoals = data !== null ? JSON.parse(data) : [];

        setGoalList(savedGoals);
      })
      .catch(() =>
        Alert.alert("Error", "Fail to load goals", [
          { text: "OK", style: "cancel" },
        ])
      )
      .finally(() => setIsLoadingData(false));
  }, []);

  // save goals after every list mutation
  useEffect(() => {
    AsyncStorage.setItem("goals", JSON.stringify(goalList)).catch(() =>
      Alert.alert("Error", "Fail to load goals", [
        { text: "OK", style: "cancel" },
      ])
    );
  }, [goalList]);

  const addGoal = async (newGoal) => {
    setGoalList((prevs) => [
      {
        id: `${prevs.length + 1}-${new Date().toISOString()}`,
        date: new Date().toISOString(),
        text: newGoal,
      },
      ...prevs,
    ]);
  };

  const deleteGoal = (id) => {
    Alert.prompt(
      "Delete Goals",
      "Are you sure you want to delete this goal ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          style: "destructive",
          onPress: () =>
            setGoalList((prevs) => prevs.filter((p) => p.id !== id)),
        },
      ]
    );

    Alert.alert("Delete Goals", "Are you sure you want to delete this goal ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => setGoalList((prevs) => prevs.filter((p) => p.id !== id)),
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* inputs */}
      <View className="pb-5 px-3 pt-12">
        <Text className="font-bold text-slate-900 text-3xl">iGoal</Text>
        <GoalInput onAddGoal={addGoal} />
      </View>

      {/* list */}
      <View
        className="border-t shadow-inner border-slate-200 bg-slate-100"
        style={{ flex: 1 }}
      >
        {isLoadingData ? (
          <Text className="text-center text-lg mt-6 text-slate-400">
            Loading Goals...
          </Text>
        ) : (
          <GoalList data={goalList} deleteGoal={deleteGoal} />
        )}
      </View>
    </View>
  );
}
