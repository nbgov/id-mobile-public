import {LogBox} from 'react-native'
import * as cm from 'store/cm'

cm.register()

LogBox.ignoreLogs([
  /^Require cycle:.*analytics/,
])

import './src/shim'
import './src/app'
