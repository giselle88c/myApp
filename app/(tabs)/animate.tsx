import React, { useRef, useState } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet, Image, Text, Dimensions, GestureResponderEvent } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {

  const [count, setCount]=useState(0);
  
  // Animated values
  const animatedValue = useRef(new Animated.Value(0)).current;
  const heartPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const handleTouch = (event: GestureResponderEvent) => {

    setCount(count => count + 1); // Use functional update

    const { pageX, pageY } = event.nativeEvent;
    console.log("check ", event.nativeEvent)

    
    // Set heart's initial position to the touch point
    heartPosition.setValue({ x: pageX, y: pageY });
    animatedValue.setValue(0);

    // Start the animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Reset position after animation if needed
      //heartPosition.setValue({ x: 0, y: 0 });
    });
  };

  // Interpolate animated value to move heart upwards
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height], // Move to the top of the screen
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Heart ❤️: {count}</Text>
      
      <Image
            source={require('@/assets/images/ham_prince.jpg')}
            style={styles.ham_ham}
          />
      <TouchableWithoutFeedback onPress={handleTouch}>
        
        <View style={styles.touchArea}>
          

          <Animated.Image
            source={require('@/assets/images/heart.png')} // Make sure you have a heart image in assets
            style={[
              styles.heart,
              {
                transform: [
                  { translateX: heartPosition.x },
                  { translateY: Animated.add(heartPosition.y, translateY) },
                ],
              },
            ]}
          />

          
        </View>
        
      </TouchableWithoutFeedback>
      
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchArea: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heart: {
    width: 50, // Set your heart image width
    height: 50, // Set your heart image height
    position: 'absolute',
  },
  ham_ham: {
    height: 300,
    width: 300,
  },
});