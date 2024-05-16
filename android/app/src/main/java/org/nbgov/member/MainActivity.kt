package org.nbgov.member

import android.os.Bundle
import android.os.Build.*
import android.view.WindowManager.LayoutParams.FLAG_SECURE
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "id"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        getWindow().addFlags(FLAG_SECURE)
        if (VERSION.SDK_INT >= VERSION_CODES.TIRAMISU) {
            setRecentsScreenshotEnabled(false)
        }
        RNBootSplash.init(this, R.style.BootTheme)
        super.onCreate(null)
    }
}
