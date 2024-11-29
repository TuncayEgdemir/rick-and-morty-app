import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "./api/axiosInstance";
import MultiSelect from "@/components/MultiSelect";
import { useCharacterStore } from "@/store/useCharacter";
import highlightQuery from "@/lib/highlatedName";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AnimatedCard from "@/components/AnimatedCard";
import RenderSelectedCharacters from "@/components/SelectedCharacter";
import { useCharacterQuery } from "@/store/useCharacterQuery";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

const Index = () => {
  const { selectedCharacters , favorites ,removeFavorite, addFavorite} = useCharacterStore();
  const { query } = useCharacterQuery();
  console.log(query);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const response = await axiosInstance.get("character");
      return response.data.results;
    },
  });

  const isFavorite = (characterId: number): boolean =>
    favorites.some((character) => character.id === characterId);

  const toggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const router = useRouter();

  

  const renderItem = ({ item }: { item: Character }) => (
    <View className="w-1/2 p-2">
      <AnimatedCard>
        <View className="bg-white rounded-lg shadow">
          <LinearGradient
            colors={["aliceblue", "aqua", "white"]}
            className="rounded-lg"
          >
            <Image
              source={{ uri: item.image }}
              className="h-40 w-full rounded-t-lg"
              resizeMode="cover"
            />
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                className="absolute top-2 right-2"
              >
                <Ionicons
                  name= "heart"
                  size={24}
                  
                  color={isFavorite(item.id) ? "red" : "white"}
                />
              </TouchableOpacity>
            <View className="p-4 flex-row rounded-b-lg">
            <View>
            <Text className="text-lg font-normal">
                {highlightQuery(item.name, query)}
              </Text>
              <Text
                className={`text-sm ${
                  item.status === "Alive" ? "text-green-500" : "text-red-500"
                }`}
              >
                Status: {item.status}
              </Text>
              <Text className="text-sm text-gray-500">
                Species: {item.species}
              </Text>
            </View>
          
            </View>
          </LinearGradient>
        </View>
      </AnimatedCard>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text className="mt-2 text-lg text-gray-600">Loading characters...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-red-500">Failed to fetch data.</Text>
        <Text className="mt-2 text-sm text-gray-500">
          Please check your connection and try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 py-12 dark:bg-black">
      <View className="py-2 flex-row items-center px-6 justify-between">
        <Text className="text-lg font-bold text-center dark:text-white light:text-gray-800">
          Rick and Morty 
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/favorites")}
          className="bg-red-500 flex-row items-center space-x-4 py-2 px-3 rounded-full"
        >
          <Ionicons name="heart" size={24} color="white" />
          <Text className="text-white">Favorites</Text>
        </TouchableOpacity>
      </View>
      <RenderSelectedCharacters />
      <FlatList
        ListHeaderComponent={<MultiSelect />}
        data={selectedCharacters.length ? selectedCharacters : data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        className="p-2"
      />
    </View>
  );
};



export default Index;
