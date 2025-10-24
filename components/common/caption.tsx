import { VALIDATION } from "@/constants/validation";
import { Text } from "react-native";
interface CaptionProps {
  text: string;
  className?: string;
  type?: keyof typeof VALIDATION;
}

export default function Caption({ text, className, type }: CaptionProps) {
  return (
    <Text
      className={`text-gray-500 text-sm ${className}`}
      style={{ color: type ? VALIDATION[type] : undefined }}
    >
      {text}
    </Text>
  );
}
