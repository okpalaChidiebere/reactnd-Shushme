# ShushMe

ShushMe allows you to pick a set of locations using Google's Places API, it then creates geofences around those places and turns your device into silent mode if you enter any of them. Once the device exits again ShushMe turns your device back to normal (whatever ringer mode and volume you had before entering)

# API Key Setup Instructions
-  Go to your [account](https://console.developers.google.com/), select a Project or create a new one.
- Click on the Library link, search for the API you want (in our case Place) and click enable to be able to use it. If its already enabled for the project if its an existing one you are good to go. But if you created a new project, you will likely have to enable it
- Go to the Credentials tab for the project, click on 'CREATE CREDENTIAL'
-  Click on add API key. Make sure you have "HTTP referrers" marked under Application restrictions then have Restrict key marked and Place API selected for this key under API Restrictions, then save your settings. It may take up to 5 mins for settings to take effect. So be patient
- ** Note if u have an already API key with restrictions you can use that key **
- [https://stackoverflow.com/questions/56400963/google-places-autocomplete-cant-load-search-results](https://stackoverflow.com/questions/56400963/google-places-autocomplete-cant-load-search-results)

# Place Picker
We used the [react-native-google-places-autocomplete](https://www.npmjs.com/package/react-native-google-places-autocomplete) package as our Package to help us pick places

# Tips and Tricks for Testing Location Apps
[https://docs.expo.io/versions/v41.0.0/sdk/location/#enabling-emulator-location](https://docs.expo.io/versions/v41.0.0/sdk/location/#enabling-emulator-location)

# Silent Mode
I did not find an Expo SDK that help me access the phone AudioManager to be able to put a user phone on silent easily like would in vanilla Android. I probably will have to write native modules in Android and iOS for this and import it into my app to get this to work. Other packages i saw just have access to the phone ringer volume; not really what we want because when your phone goes silent, the volume could still be high but you will nto receive notification sound and ringing tone sound. Hopefully i implement this later for personal learning
There was a few advices
- [https://stackoverflow.com/questions/55104470/detect-silent-mode-in-react-native](https://stackoverflow.com/questions/55104470/detect-silent-mode-in-react-native)

# Troubleshooting locations
FYI, from experience, if your code dont work, primary check your app permission setup procedures for Android and iOS
- [https://github.com/expo/expo/issues/12662](https://github.com/expo/expo/issues/12662)
- [https://docs.expo.io/versions/v38.0.0/sdk/permissions/#permissionslocation](https://docs.expo.io/versions/v38.0.0/sdk/permissions/#permissionslocation) (In general, every information you need is here)
- [https://stackoverflow.com/questions/52002466/error-appstore-connect-missing-purpose-string-in-info-plist-file](https://stackoverflow.com/questions/52002466/error-appstore-connect-missing-purpose-string-in-info-plist-file)