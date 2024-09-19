import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const ParallaxLayer = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const autoplayRef = useRef(null);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.9,
    height: PAGE_HEIGHT * 0.1,
  };

  const data = [
    {
      heading: " Adopt a Balanced Diet",
      image: require("../images/quote.jpg"),
      description: "Focus on a diet low in sodium and rich in potassium to manage blood pressure effectively.",
     
    },
    {
      heading: "Boost Iron Intake",
      image: require("../images/imgfour.jpg"),
      description: "Consume iron-rich foods like spinach and lean meats to help prevent anemia during pregnancy.",
    },
    {
      heading: "Regular Blood Tests",
      image: require("../images/imgthree.jpg"),
      description: "Schedule regular check-ups to monitor your iron levels and overall health.",
    },
    {
      heading: "Monitor Blood Pressure",
      image: require("../images/imgtwo.jpg"),
      description: "Regularly check your blood pressure to catch any signs of hypertension early.",
    },
  ];

  useEffect(() => {
    if (isAutoplaying && autoplayRef.current) {
      // Trigger spring animation when autoplaying
      autoplayRef.current();
    }
  }, [isAutoplaying]);

  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        style={styles.carousel}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={1000}
        onProgressChange={(index, absoluteProgress) => {
          setProgressValue(absoluteProgress);
        }}
        onAutoplayStart={() => {
          setIsAutoplaying(true);
        }}
        onAutoplayEnd={() => {
          setIsAutoplaying(false);
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={data}
        renderItem={({ index }) => (
          <ParallaxSlide
            index={index}
            progressValue={progressValue}
            data={data}
            autoplayRef={autoplayRef}
          />
        )}
      />
    </View>
  );
};

const ParallaxSlide = ({ index, progressValue, data, autoplayRef }) => {
  const animatedOpacity = useSharedValue(0);
  const animatedScale = useSharedValue(1); // Set initial scale to 1

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      animatedOpacity.value = withSpring(1, {}, () => {
        if (autoplayRef.current) {
          autoplayRef.current();
        }
      });
      animatedScale.value = withSpring(1);
    }, 500); // Introduce a delay of 500 milliseconds

    return () => clearTimeout(animationTimeout);
  }, [index, autoplayRef, animatedOpacity, animatedScale]);

  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progressValue,
      [index - 1, index, index + 1],
      [1, 1, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity: animatedOpacity.value,
      transform: [{ scale: animatedScale.value * scale }],
    };
  });

  return (
    <Animated.View style={[styles.slide, animStyle]}>
      <Text style={styles.heading}>{data[index].heading}</Text>
      <View style={styles.imageContainer}>
        <Image source={data[index].image} style={styles.image} />
      </View>
      <View style={{width:210, paddingTop:10}}>
      <Text style={styles.description}>{data[index].description}</Text>
      </View>
     
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:10,
    paddingRight:10,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    width: PAGE_WIDTH * 0.9,
    height: PAGE_HEIGHT * 0.2,
  },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    height:150,
    justifyContent:"center", 
   
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  heading: {
    top:-5,
    fontSize: 20,
    color: "#ff7373",
    fontWeight: "bold",
  },
  imageContainer: {
    position: "absolute",
    top: 45,
    right: 10,
    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    
  },
  description: {
    paddingBottom:0,
    fontSize: 16,
    color: "black",
    opacity:0.6
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default ParallaxLayer;
