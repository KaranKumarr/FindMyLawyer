import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import {
  useFonts,
  Lora_400Regular,
  Lora_500Medium,
  Lora_600SemiBold,
  Lora_700Bold,
} from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import ChooseSignUpOption from './screens/ChooseSignUpOption';
import ClientSignUp from './screens/ClientSignUp';
import LawyerSignUp from './screens/LawyerSignUp';
import ClientHome from './screens/ClientHome';
import { AuthProvider } from './context/AuthProvider';
import LawyersSearching from './screens/LawyersSearching';
import LawyerProfileView from './screens/LawyerProfileView';
import LawyerBookAppointment from './screens/LawyerBookAppointment';
import ClientAppointmentHistory from './screens/ClientAppointmentHistory';
import AppointmentDetails from './screens/AppointmentDetails';
import AdminDashboard from './screens/AdminDashboard';
import LawyerHome from './screens/LawyerHome';
import LawyerInformation from './screens/LawyerInformation';
import LawyerAppointments from './screens/LawyerAppointments';
import LawyerAddSummary from './screens/LawyerAddSummary';
import LawyerReviews from './screens/LawyerReviews';
import LawyerSetAvailability from './screens/LawyerSetAvailability';

export default function App() {

  let [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_500Medium,
    Lora_600SemiBold,
    Lora_700Bold,
  });

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>

        <Stack.Navigator
          initialRouteName="lawyerHome"
          screenOptions={{ headerShown: false }}>

          <Stack.Screen
            name='login'
            component={LoginScreen}
          />

          <Stack.Screen
            name='chooseSignUpOption'
            component={ChooseSignUpOption}
          />

          <Stack.Screen
            name='clientSignUp'
            component={ClientSignUp}
          />

          <Stack.Screen
            name='lawyerSignUp'
            component={LawyerSignUp}
          />

          <Stack.Screen
            name='clientHome'
            component={ClientHome}
          />

          <Stack.Screen
            name='lawyersSearching'
            component={LawyersSearching}
          />

          <Stack.Screen
            name='lawyerProfileView'
            component={LawyerProfileView}
          />

          <Stack.Screen
            name='lawyerBookAppointment'
            component={LawyerBookAppointment}
          />

          <Stack.Screen
            name='clientAppointmentHistory'
            component={ClientAppointmentHistory}
          />

          <Stack.Screen
            name='appointmentDetails'
            component={AppointmentDetails}
          />

          <Stack.Screen
            name='adminDashboard'
            component={AdminDashboard}
          />

          <Stack.Screen
            name='lawyerHome'
            component={LawyerHome}
          />

          <Stack.Screen
            name='lawyerInformation'
            component={LawyerInformation}
          />

          <Stack.Screen
            name='lawyerAppointments'
            component={LawyerAppointments}
          />

          <Stack.Screen
            name='lawyerAddSummary'
            component={LawyerAddSummary}
          />

          <Stack.Screen
            name='lawyerReviews'
            component={LawyerReviews}
          />

          <Stack.Screen
            name='lawyerSetAvailability'
            component={LawyerSetAvailability}
          />

        </Stack.Navigator>

      </NavigationContainer>
    </AuthProvider>
  );
}