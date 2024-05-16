import s from "ui/styles";

export const getTitleStyle = ({
  raised = true,
  enabled = true,
  accent = false,
  titleStyle,
}) =>
  s(
    "fs14 ttu fw500",
    raised
      ? "textInvert"
      : enabled
        ? accent
          ? "accent"
          : "primary"
        : "textDisabled",
    titleStyle,
  );
