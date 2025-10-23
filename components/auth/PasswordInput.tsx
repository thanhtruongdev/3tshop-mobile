import { Eye, EyeClosed } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
};

export default function PasswordInput({
  value,
  onChangeText,
  placeholder,
}: Props) {
  const [secure, setSecure] = useState(true);

  return (
    <View className="w-full">
      <View className="flex-row items-center border border-gray-300 rounded-md px-3 h-16 bg-white">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ?? "Mật khẩu"}
          secureTextEntry={secure}
          autoCapitalize="none"
          className="flex-1 text-base text-gray-900 "
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity
          onPress={() => setSecure((s) => !s)}
          className="ml-2 px-2 py-1"
        >
          {secure ? (
            <Eye size={20} color="#825B32" />
          ) : (
            <EyeClosed size={20} color="#825B32" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
