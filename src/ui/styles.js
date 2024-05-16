import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { createStyles } from "react-native-tstyles";
import Logo from "res/img/logo.png";

export const colors = {
  red: "#ff0000",
  blue: "#0000ff",
  statusbar: "#FFFFFF",
  back: "#EEEEEE",
  backSecond: "#FFFFFF",
  backDisabled: "#F6F6F6",
  accent: "#00BFA5",
  accentDisabled: "#00BFA5b2",
  success: "",
  primary: "#E24821",
  primaryContainer: "#FFDAD2",
  disabledPrimary: "#FFDAD2",
  text: "#263238",
  textSecond: "#444",
  textDisabled: "#AAAAAA",
  textInvert: "#FFFFFF",
  border: "#AAAAAA",
  shadow: "#AAAAAA",
  transparentBlack: "#00000033",
  black: "#000000",
  telegram: "#229ED9",
};

export default createStyles({
  colors,
  dimensions: [3, 6, 13, 80, 144, 360, 384],
  styles: {
    card: {
      backgroundColor: colors.backSecond,
      paddingHorizontal: 16,
      borderRadius: 12,
    },
    shadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    note: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: colors.primaryContainer,
      fontStyle: "italic",
    },
    fw500: {
      fontWeight: 500,
    },
  },
});

export const VeriffBranding = {
  logo: resolveAssetSource(Logo),
  background: colors.backSecond,
  onBackground: colors.text,
  onBackgroundSecondary: colors.primary,
  onBackgroundTertiary: colors.textDisabled,
  primary: colors.primary,
  onPrimary: colors.textInvert,
  secondary: colors.primary,
  onSecondary: colors.textInvert,
  outline: colors.disabledPrimary,
  cameraOverlay: colors.black,
  onCameraOverlay: colors.textInvert,
  error: colors.disabledPrimary,
  success: colors.primary,
  buttonRadius: 24,
};
