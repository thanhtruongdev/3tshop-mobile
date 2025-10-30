import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/common/button";
import Caption from "@/components/common/caption";
import BackgroundWrapper from "@/components/wrappers/background";
import { COLORS } from "@/constants/colors";
import { AuthService } from "@/services/auth.service";
import { isValidEmail } from "@/utils/auth-helper";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidation, setEmailValidation] = useState<string | null>(null);
  const [passwordValidation, setPasswordValidation] = useState<string | null>(
    null
  );

  const handleOnSubmit = async () => {
    if (checkValidations()) {
      setIsLoading(true);
      try {
        const result = await AuthService.login({ email, password });
        if (result) {
          Toast.success("Đăng nhập thành công");
          router.replace("/(tabs)/home");
          setIsLoading(false);
        } else {
          Toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("Login error:", error);
        Toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        setIsLoading(false);
        return;
      }
    }
  };

  const checkValidations = () => {
    if (!email.trim() && !password.trim()) {
      setEmailValidation("Vui lòng nhập email");
      setPasswordValidation("Vui lòng nhập mật khẩu");
      return false;
    } else if (!isValidEmail(email.trim())) {
      setEmailValidation("Email không hợp lệ");
      return false;
    } else {
      setEmailValidation(null);
    }

    if (!password.trim()) {
      setPasswordValidation("Vui lòng nhập mật khẩu");
      return false;
    } else {
      setPasswordValidation(null);
    }
    return true;
  };

  const onEmailChange = (text: string) => {
    setEmail(text);
    text ? setEmailValidation(null) : setEmailValidation("Vui lòng nhập email");
  };

  const onPasswordChange = (text: string) => {
    setPassword(text);
    text
      ? setPasswordValidation(null)
      : setPasswordValidation("Vui lòng nhập mật khẩu");
  };

  return (
    <BackgroundWrapper className="">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <View className="w-full h-full">
          {/* Header */}
          <View
            className="w-full items-center justify-center"
            style={{
              backgroundColor: COLORS.PRIMARY,
              paddingVertical: 56,
              height: "32%",
            }}
          >
            <Image
              source={require("../../../assets/logo/3T_Shop_white.png")}
              style={{ width: 100, height: 100 }}
            />
          </View>

          {/* Card */}
          <View className="-mt-10 px-6">
            <View
              className="bg-white rounded-xl p-6 shadow-lg"
              style={
                Platform.OS === "android"
                  ? { elevation: 6 }
                  : { shadowColor: "#000" }
              }
            >
              <Text className="text-3xl font-semibold text-gray-900 text-center">
                Chào mừng trở lại
              </Text>
              <Text className="text-md text-gray-500 text-center mt-1 mb-4">
                Đăng nhập để tiếp tục
              </Text>

              <View className="mt-3">
                <Text className="text-md text-gray-700 mb-1">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={onEmailChange}
                  placeholder="email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full border border-gray-200 rounded-md px-3 py-3 text-base text-gray-900 h-16"
                  placeholderTextColor="#9CA3AF"
                />
                {emailValidation && (
                  <Caption
                    text={emailValidation}
                    className="mt-1"
                    type="ERROR"
                  />
                )}
              </View>

              <View className="mt-4">
                <Text className="text-md text-gray-700 mb-1">Mật khẩu</Text>
                <PasswordInput
                  value={password}
                  onChangeText={onPasswordChange}
                />
                {passwordValidation && (
                  <Caption
                    text={passwordValidation}
                    className="mt-1"
                    type="ERROR"
                  />
                )}
              </View>
              {/* 
              <TextButton
                onPress={handleOnForgotPassword}
                text="Quên mật khẩu?"
                buttonClassName="items-end"
              /> */}

              <Button
                onSubmit={handleOnSubmit}
                text="Đăng nhập"
                loading={isLoading}
                className="rounded-full mt-8"
                textClassName="text-white"
                loadingText="Đang đăng nhập..."
                variant={"PRIMARY"}
              />
              <Text className="text-sm text-gray-500 text-center mt-4">
                {`Chỉ nhân viên giao hàng mới được phép \nđăng nhập vào ứng dụng này.`}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </BackgroundWrapper>
  );
}
