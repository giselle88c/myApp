import React, { useRef, useState } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet, Image, Text, Dimensions, GestureResponderEvent, ImageBackground, Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {

  const [count, setCount] = useState(0);

  // Animated values
  const animatedValue = useRef(new Animated.Value(0)).current;
  const heartPosition = useRef(new Animated.ValueXY({ x: -40, y: -40 })).current;

  const handleTouch = (event: GestureResponderEvent) => {

    setCount(count => count + 1); // Use functional update

    const { pageX, pageY } = event.nativeEvent;
    //console.log("check ", event.nativeEvent)


    // Set heart's initial position to the touch point
    heartPosition.setValue({ x: pageX-20, y: pageY-20 });
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

      <ImageBackground
        source={require('@/assets/images/palace_bg.jpg')}
        style={styles.background}
        
      >


        <View style={styles.overlay}>
          <Text style={styles.text}>Prince Ham</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#e70390ff', }}>❤️ {count}</Text>

          <Image
            source={require('@/assets/images/ham_prince_no_bg2.png')}
            style={[styles.ham_ham, {resizeMode: 'contain'}]}
          />

          <Pressable onPress={handleTouch} style={styles.touchArea}>

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

          </Pressable>
        </View>
      </ImageBackground>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(73, 197, 193, 0.5)',
    alignItems: 'center', // Align items in the center

  },
  touchArea: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heart: {
    width: 40, // Set your heart image width
    height: 40, // Set your heart image height
    position: 'absolute',
  },
  ham_ham: {
    flex: 1,
    //height: height,
    width: width,
    //resizeMode: "contain",
  },
  background: {
    flex: 1, // Fill the entire screen
    justifyContent: 'flex-end', // Center the content vertically
    alignItems: 'center', // Align items in the center
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,

  },
  overlay: {
    flex: 1,
    //backgroundColor: 'rgba(155, 190, 221, 0.5)', // Optional: Add an overlay for readability
    paddingTop: 70,
    borderRadius: 10,
    justifyContent: 'flex-end', // Center the content vertically
    alignItems: 'center', // Align items in the center
  },
  text: {
    color: '#f5258dff',
    fontWeight: 'bold',
    fontSize: 40,
  },
});