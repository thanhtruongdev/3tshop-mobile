import { View } from "react-native";
import { Button } from "../common/button";

interface BottomActionProps {
  text: string;
  onSubmit: () => void;
}

export const BottomAction = ({ onSubmit, text }: BottomActionProps) => {
  return (
    <View className="px-6 pt-1 pb-4 bg-white">
      <Button text={text} onSubmit={onSubmit} variant={"SECONDARY"} />
    </View>
  );
};
