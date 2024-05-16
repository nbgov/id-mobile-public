import Clipboard from "@react-native-clipboard/clipboard";

export const copyString = (str) => Clipboard.setString(str);
