import React, { useState } from "react";
import {
  TextInput,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons"; 
import axiosInstance from "@/app/api/axiosInstance";
import { useCharacterStore } from "@/store/useCharacter";
import highlightQuery from "@/lib/highlatedName";
import RenderSelectedCharacters from "./SelectedCharacter";
import { useCharacterQuery } from "@/store/useCharacterQuery";

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  episode: string[];
  status: string;
  species: string;
}

const MultiSelect: React.FC = () => {
  const { selectedCharacters, addCharacter, removeCharacter } =
    useCharacterStore();

  const {query, setQuery} = useCharacterQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["filteredCharacters", query],
    queryFn: async () => {
      if (query === "") return [];
      const response = await axiosInstance.get<{ results: Character[] }>(
        `character/?name=${query}`
      );
      return response.data.results;
    },
    enabled: query.length >= 3,
  });

  const isSelected = (characterId: number): boolean =>
    selectedCharacters.some((character) => character.id === characterId);

  const toggleCharacterSelection = (character: Character) => {
    if (isSelected(character.id)) {
      removeCharacter(character.id);
    } else {
      addCharacter(character);
    }
  };

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (text.length >= 3) {
      setIsExpanded(true); 
    }
  };

  return (
    <View className="flex-1 px-4 py-2 light:bg-white">
      <View className="flex-row items-center p-3 bg-white rounded-lg shadow-md border border-gray-300">
        <TextInput
          className="flex-1 text-black text-base placeholder-gray-400"
          placeholder="Karakter ara..."
          placeholderTextColor="gray"
          value={query}
          onChangeText={handleQueryChange}
        />
        {query.length >= 3 && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>

      {query.length >= 3 && isExpanded && (
        <View className="mt-2 bg-white rounded-lg shadow-md border border-gray-300">
          {isLoading && (
            <View className="p-4 items-center">
              <ActivityIndicator size="small" color="#00BFFF" />
              <Text className="text-gray-500 text-sm mt-2">Yükleniyor...</Text>
            </View>
          )}

          {error && (
            <View className="p-4 items-center">
              <Text className="text-red-500 text-sm">
                Bir hata oluştu. Lütfen tekrar deneyin.
              </Text>
            </View>
          )}

          {!isLoading && !error && (
            <ScrollView
              style={{ maxHeight: 300 }}
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled
            >
              <FlatList
                data={data || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row items-center px-4 py-3 border-b border-gray-200"
                    onPress={() => toggleCharacterSelection(item)}
                  >
                    <View
                      className={`w-5 h-5 mr-3 rounded-full ${
                        isSelected(item.id) ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />

                    <Image
                      source={{ uri: item.image }}
                      className="w-10 h-10 rounded-full mr-3"
                    />

                    <View className="flex-1">
                      <Text className="text-black font-normal text-sm">
                        {highlightQuery(item.name, query)}
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        {item.episode.length} episodes
                      </Text>
                    </View>
                    <Text>{item.gender}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <Text className="text-gray-500 text-center mt-4">
                    Sonuç bulunamadı.
                  </Text>
                )}
              />
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default MultiSelect;
