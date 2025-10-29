import { BUTTON_VARIANTS } from "@/constants/button";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onSubmit: () => void;
  text: string;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  variant: keyof typeof BUTTON_VARIANTS;
}

export const Button = ({
  onSubmit,
  text,
  loading,
  loadingText,
  className,
  variant,
}: ButtonProps) => {
  const buttonStyles = BUTTON_VARIANTS[variant];
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSubmit}
      disabled={loading}
      className={`py-3 items-center justify-center flex-row gap-1 ${className} bg-[${buttonStyles.backgroundColor}] border-[${buttonStyles.borderColor}] rounded-full`}
      style={{ elevation: 1, height: 48, opacity: loading ? 0.7 : 1 }}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color={buttonStyles.textColor} />
          <Text
            className={`text-[${buttonStyles.textColor}] font-bold text-md`}
          >
            {loadingText}
          </Text>
        </>
      ) : (
        <Text className={`text-[${buttonStyles.textColor}] font-bold text-md`}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
