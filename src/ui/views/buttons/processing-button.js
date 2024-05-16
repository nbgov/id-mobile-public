import { useCallback, useState, memo } from "react";
import { ActivityIndicator } from "react-native";
import Button from "./button";
import { colors } from "ui/styles";

export default memo(ProcessingButton);

function ProcessingButton({
  title,
  processing = false,
  enabled = true,
  raised = true,
  onPress,
  children,
  ...props
}) {
  const [pressProcessing, setPressProcessing] = useState(false);
  processing ||= pressProcessing;

  if (processing) {
    title = undefined;
    enabled = false;
  }

  const indicatorColor = raised ? colors.textInvert : colors.primary;

  const handlePress = useCallback(async () => {
    setPressProcessing(true);
    try {
      await onPress?.();
    } finally {
      setPressProcessing(false);
    }
  }, [onPress]);

  return (
    <Button
      onPress={onPress && handlePress}
      {...{ title, enabled, raised }}
      {...props}
    >
      {processing ? (
        <ActivityIndicator color={indicatorColor} size="small" />
      ) : (
        children
      )}
    </Button>
  );
}
