import { BUTTON_VARIANTS } from "@/constants/button";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onSubmit: () => void;
  text: string;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  textClassName?: string;
  variant: keyof typeof BUTTON_VARIANTS;
}

export const Button = ({
  onSubmit,
  text,
  loading,
  loadingText,
  className,
  textClassName,
  variant = "PRIMARY",
}: ButtonProps) => {
  const buttonStyles = BUTTON_VARIANTS[variant];
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSubmit}
      disabled={loading}
      className={`py-3 items-center justify-center flex-row gap-1 ${className} rounded-full`}
      style={{
        elevation: 1,
        height: 48,
        opacity: loading ? 0.7 : 1,
        backgroundColor: buttonStyles.backgroundColor,
        borderColor: buttonStyles.borderColor,
        borderWidth: 2,
      }}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color={buttonStyles.textColor} />
          <Text className={`${textClassName} font-bold text-md`}>
            {loadingText}
          </Text>
        </>
      ) : (
        <Text className={`${textClassName} font-bold text-md`}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
