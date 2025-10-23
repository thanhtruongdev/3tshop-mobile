import { TOKEN_KEY } from '@/constants/storage';
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