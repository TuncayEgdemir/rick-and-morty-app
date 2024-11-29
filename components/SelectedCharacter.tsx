import { useCharacterStore } from "@/store/useCharacter";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

const RenderSelectedCharacters = () => {

    const { selectedCharacters, removeCharacter } = useCharacterStore();
    return (
      <View className="flex flex-row p-4 flex-wrap items-center">
        {selectedCharacters.map((option) => (
          <View
            key={option.id}
            className={`m-1.5 flex flex-row items-center rounded-full bg-blue-200 p-1 px-2`}
          >
            <Text className={`mr-1.5`}>{option.name}</Text>
            <TouchableOpacity onPress={() => removeCharacter(option.id)}>
              <Text className={`text-lg font-bold`}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

export default RenderSelectedCharacters;