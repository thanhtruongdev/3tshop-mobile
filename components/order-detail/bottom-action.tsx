import { View } from "react-native";
import { Button } from "../common/button";

interface BottomActionProps {
  onSubmit: () => void;
}

export const BottomAction = ({ onSubmit }: BottomActionProps) => {
  return (
    <View className="px-6 pt-1 pb-4 bg-white">
      <Button text="Hoàn tất đơn hàng" onSubmit={onSubmit} />
    </View>
  );
};
