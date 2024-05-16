module.exports = {
  project: {
    android: {
      unstable_reactLegacyComponentNames: ['CameraView'],
    },
    ios: {
      unstable_reactLegacyComponentNames: ['CameraView'],
    },
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-flipper': {
      platforms: {
        ios: null,
        android: null,
      },
    },
    'react-native-keychain': {
      platforms: {
        android: null,
      },
    },
  },
}
