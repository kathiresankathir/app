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

const Patientparallax = () => {
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
      heading: "Anemia",
      image: require("../images/imganem.jpg"),
      description: "Low red blood cell count, affecting both maternal and fetal health",
     
    },
    {
      heading: "Hypertension",
      image: require("../images/hypimg.jpg"),
      description: "High blood pressure lead to complications for both mother and baby.",
    },
    {
      heading: "General",
      image: require("../images/genimg.jpg"),
      description: "ensuring the well-being of both mother and baby through regular care and monitoring.",
    },
    // {
    //   heading: "",
    //   image: require("../images/pills.png"),
    //   description: "Description for Slide 4",
    // },
  ];

  // useEffect(() => {
  //   if (isAutoplaying && autoplayRef.current) {
  //     // Trigger spring animation when autoplaying
  //     autoplayRef.current();
  //   }
  // }, [isAutoplaying]);

  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        style={styles.carousel}
        loop
        pagingEnabled
        snapEnabled
        // autoPlay
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
      [1,1, 1],
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
      <View style={{width:180, paddingTop:10}}>
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
    height:125,
    justifyContent:"center", 
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  heading: {
    fontSize: 20,
    color: "#119988",
    fontWeight: "bold",
  },
  imageContainer: {
    position: "absolute",
    top: 20,
    right: 10,
    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    
  },
  description: {
    fontSize: 14,
    color: "black",
    opacity:0.6,
    marginTop:-4,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default Patientparallax;
