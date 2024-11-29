import { Text } from "react-native";

const highlightQuery = (text: string, query: string) => {
    if (!query) return <Text>{text}</Text>;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} className={`text-black font-extrabold`}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

export default highlightQuery;