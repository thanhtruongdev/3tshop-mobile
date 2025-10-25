import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onSubmit: () => void;
  text: string;
  loading?: boolean;
  loadingText?: string;
  className?: string;
}

export const Button = ({
  onSubmit,
  text,
  loading,
  loadingText,
  className,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSubmit}
      disabled={loading}
      className={`bg-yellow-800 py-3 items-center justify-center flex-row gap-1 ${className}`}
      style={{ elevation: 1, height: 48, opacity: loading ? 0.7 : 1 }}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text className="text-white font-bold text-md">{loadingText}</Text>
        </>
      ) : (
        <Text className="text-white font-bold text-md">{text}</Text>
      )}
    </TouchableOpacity>
  );
};
