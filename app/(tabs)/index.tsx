import React, {useState, useEffect, useRef} from 'react';

import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, Dimensions, Animated } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';




const { width } = Dimensions.get('window');

export default function HomeScreen() {

  
  const [count, setCount]=useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const scaleAnim = new Animated.Value(0); // Initial scale
  const translateXAnim = new Animated.Value(-100); // Start from off-screen (left)

  useEffect(() => {
    // Start the fading and scaling animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity
      duration: 5000, // Duration of 5 seconds
      useNativeDriver: true,
    }).start();

    // Sequence to scale first and then translate
    Animated.sequence([
      // Scale up from 0 to 1
      Animated.timing(scaleAnim, {
        toValue: 1, // Final scale
        duration: 2000, // Duration for scaling (2 seconds)
        useNativeDriver: true,
      }),
      // After scaling, start translating from left to right
      Animated.timing(translateXAnim, {
        toValue: 0, // Final position (translate to the right)
        duration: 3000, // Duration for translation (3 seconds)
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, translateXAnim]);

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/bread_ham.jpg')}
          style={styles.Hamlogo}
        />
      
      }>
      <Animated.View style={{ ...styles.Myhamham, opacity: fadeAnim, transform: [{ scale: scaleAnim }, { translateX: translateXAnim }] }}>
              <Image
                  source={require('@/assets/images/hamster.gif')}
                  style={styles.container}
              />
      </Animated.View>

      <View style={styles.container}>
      <Text style={styles.titleContainer}>Payme ${count}</Text>
      <Button title={'Donate'} onPress={()=>setCount(count+1)}/>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">小薯</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Save the pet ❤️</ThemedText>
        <ThemedText>
          Hamster, <ThemedText type="defaultSemiBold">小薯</ThemedText> is very poor.
          
            {/*
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
            */}
            
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">What's more?</ThemedText>
          </Link.Trigger>
        </Link>

        <ThemedText>
          {`Tap "Explore" tab to know more about him.`}
        </ThemedText>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  Myhamham: {
    height: 300,
    width: 300,
    
  },
  Hamlogo: {
    height: 100,
    width: width,
    position:'absolute',
    
  },

  container:{
    flex:1

  },
  title:{
    fontSize:24,
    fontWeight:'bold'
  }
});


