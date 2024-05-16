import { useLayoutEffect } from "react";
import { UIManager } from "react-native";
import { select } from "picofly/react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { spec, callback } from "lib/selectors";
import * as splash from "store/splash";
import { inited, ready } from "./selectors";
import { isCountryAsk, isAllowedCountry } from "store/denied-country/selectors";
import { locked } from "store/lock/selectors";
import Routes from "./routes";
import Modals from "./modals";
import TabBar from "./app-views/nav-bar";
import CryptoBridge from "./app-views/crypto-bridge";
import DeniedCountry from "./screens/denied-country";
import PinAsk from "./screens/pin-ask";
import Loading from "./screens/loading";
import s from "./styles";

UIManager.setLayoutAnimationEnabledExperimental?.(true);

export default select(
  spec({ ready, inited, locked, isCountryAsk, isAllowedCountry }),
  callback("onReady", splash.hide),
)(UI);

function UI({
  ready,
  inited,
  locked,
  isCountryAsk,
  isAllowedCountry,
  onReady,
}) {
  const showDeniedCountry = isCountryAsk || !isAllowedCountry;
  const showPinAsk = inited && !showDeniedCountry && locked;
  const showApp = inited && !showDeniedCountry && !locked;
  const showLoading = !inited && !showDeniedCountry;

  useLayoutEffect(() => {
    if (!ready) return;
    if (!inited && !showDeniedCountry) return;
    onReady?.();
  }, [ready, inited, showDeniedCountry, onReady]);

  return (
    ready && (
      <SafeAreaProvider>
        <SafeAreaView style={s`f1 bgBackSecond`}>
          {showLoading && <Loading />}
          {showDeniedCountry && <DeniedCountry />}
          {showPinAsk && <PinAsk animationType="fade" />}
          {showApp && (
            <>
              <Routes />
              <TabBar />
              <CryptoBridge />
              <Modals />
            </>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
}
