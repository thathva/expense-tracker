import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CreateExpense from './components/Expense/CreateExpense'
import ViewExpense from './components/Expense/ViewExpense'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{
              headerShown: false
            }} component={Homepage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Dashboard" component={Dashboard}/>
            <Stack.Screen name="CreateExpense" component={CreateExpense}/>
            <Stack.Screen name="ViewExpense" component={ViewExpense}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
