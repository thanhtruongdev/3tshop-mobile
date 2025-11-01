import { TOKEN_KEY, USER_INFO_KEY } from '@/constants/storage';
import { NhanVien } from '@/types/user.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
}

export const setToken = async (token: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
}

export const removeToken = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
}

export const setUserInfor = async (userInfo: NhanVien) => {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

export const getUserInfor = async () => {
    const userInfo = await AsyncStorage.getItem(USER_INFO_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
}

export const removeUserInfor = async () => {
    await AsyncStorage.removeItem(USER_INFO_KEY);
}