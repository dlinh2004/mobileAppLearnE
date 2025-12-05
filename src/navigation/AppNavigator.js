import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import QuizScreen from '../screens/QuizScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Stack.Screen name="Flashcard" component={FlashcardScreen} options={{ title: 'Học Flashcard' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Làm Quiz' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Trò Chuyện với AI' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
