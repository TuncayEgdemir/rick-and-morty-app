import React from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useCharacterStore } from "@/store/useCharacter";
import { Ionicons } from "@expo/vector-icons";

const Favorites = () => {
  const { favorites, removeFavorite } = useCharacterStore();

  return (
    <View className="flex-1 light:bg-gray-100">
      <Text className="text-2xl font-bold dark:text-white light:text-black text-center my-4">
        Favori Karakterlerim
      </Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="w-full px-5 shadow py-2 border-b border-gray-300">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center   space-x-4">
                  <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full" />
                 <View>
                 <Text className="text-lg dark:text-white font-bold">{item.name}</Text>
                 <Text className="text-sm dark:text-white font-normal">Status: {item.status}</Text>
                    <Text className="text-sm   dark:text-white font-normal">Species: {item.species}</Text>
                 </View>
                </View>
                <TouchableOpacity
                  className="bg-gray-200 rounded-full p-2"
                  onPress={() => removeFavorite(item.id)}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center">
            You have no favorite characters yet.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;
