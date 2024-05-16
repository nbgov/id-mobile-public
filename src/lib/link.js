import { Linking } from "react-native";

export const mailto = async (email) => Linking.openURL(`mailto:${email}`);

export const site = async (url) => Linking.openURL(url);
