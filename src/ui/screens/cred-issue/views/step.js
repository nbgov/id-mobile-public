import { useEffect, useCallback, useState, useRef } from "react";
import { LayoutAnimation, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { select } from "picofly/react";
import { effect, setter } from "lib/selectors";
import * as analytics from "store/analytics";
import { next } from "../actions";
import Text from "ui/views/text";
import Touchable from "ui/views/touchable";
import s from "ui/styles";

const openProps = (app, props) => {
  const { stepNo } = app.ui.credIssue;
  const opened = props.stepNo === stepNo;
  const isPrevStep = props.stepNo < stepNo;
  const canOpen = isPrevStep && !opened && !props.complete;
  const enabled = opened || (isPrevStep && !props.complete);

  return { opened, canOpen, enabled };
};

const nextIfComplete = effect({
  init: (app, props) => {
    const isCurrentStep = props.stepNo === app.ui.credIssue.stepNo;

    if (isCurrentStep && props.complete) {
      next(app);
    }
  },
  getDeps: (app, props) => [
    props.complete,
    props.stepNo,
    app.ui.credIssue.stepNo,
  ],
});

const openCloseAnalytics = (app, props) => {
  const openedRef = useRef(false);

  useEffect(() => {
    const step = app.ui.credIssue.steps[props.stepNo];

    if (props.opened) {
      analytics.issueStepOpened(app, step);
      openedRef.current = true;
    } else {
      if (!openedRef.current) return;
      analytics.issueStepClosed(app, step);
    }
  }, []);
};

const completeAnalytics = effect({
  init: (app, props) => {
    if (!props.complete) return;

    const step = app.ui.credIssue.steps[props.stepNo];
    analytics.issueStepComplete(app, step);
  },
  getDeps: (app, props) => [props.complete],
});

export default select(
  openProps,
  setter("onOpen", "ui.credIssue.stepNo"),
  nextIfComplete,
  openCloseAnalytics,
  completeAnalytics,
)(Step);

function Step({
  stepNo,
  title,
  complete,
  opened,
  enabled,
  canOpen,
  onOpen,
  children,
  style,
}) {
  const [show, setShow] = useState(opened);

  useEffect(() => {
    setShow(opened);
    LayoutAnimation.configureNext(AnimationConfig);
  }, [opened]);

  const open = useCallback(() => {
    onOpen?.(stepNo);
  }, [stepNo, onOpen]);

  return (
    <View
      style={s(
        "card ph0",
        show && "shadow",
        !enabled && "bgBackDisabled",
        style,
      )}
    >
      <Touchable
        withoutFeedback
        onPress={canOpen ? open : undefined}
        style={s`ph16 pv12 row asfb aic`}
      >
        <Icon
          name="circle-check"
          style={s("mt2 mr16 fs24", complete ? "accentDisabled" : "back")}
        />
        <Text
          style={s(
            "f1 fs18 fw500",
            (complete && "accentDisabled") || (!enabled && "textDisabled"),
          )}
        >
          {title}
        </Text>
        {canOpen && <Icon name="chevron-down" style={s("fs16 textSecond")} />}
      </Touchable>
      {show && <View style={s`p16 pt0`}>{children}</View>}
    </View>
  );
}

const AnimationConfig = {
  duration: 300,
  create: {
    duration: 300,
    type: "easeInEaseOut",
    property: "opacity",
  },
  delete: {
    duration: 50,
    type: "easeInEaseOut",
    property: "opacity",
  },
};
