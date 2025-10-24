import { Text, TouchableOpacity } from "react-native";

interface TextButtonProps {
  onPress: () => void;
  text: string;
  buttonClassName?: string;
  textClassName?: string;
}

export const TextButton = ({
  onPress,
  text,
  buttonClassName,
  textClassName,
}: TextButtonProps) => {
  return (
    <TouchableOpacity className={`mt-3 ${buttonClassName}`} onPress={onPress}>
      <Text className={`text-yellow-800 text-md ${textClassName}`}>{text}</Text>
    </TouchableOpacity>
  );
};
