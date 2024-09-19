import React from 'react';
import { View, StyleSheet, PixelRatio, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';

const RnIncrementDecrementBtn = ({
  val,
  minVal,
  max,
  disableControl,
  minreq,
  handleClick,
  styleTextInput,
  styleBtn,
  disabledColor,
  activeColor,
  labelStyle,
}) => {
  const [value, changeValue] = React.useState(0);
  const [count, changeCount] = React.useState(100);
  const [minReq, addMinReq] = React.useState(0);
  const [min, addMinValue] = React.useState(0);
  const [leftBtnDisable, changeLeftBtnDisable] = React.useState(false);
  const [rightBtnDisable, changeRightBtnDisable] = React.useState(false);
  const [disableColorBtn, addDisableColor] = React.useState('#eeeeee');
  const [activeColorBtn, addActiveColor] = React.useState('#119988');

  React.useEffect(() => {
    if (val) {
      changeValue(val);
    }
    if (max) {
      changeLeftBtnDisable(max <= 0);
      changeCount(max - 0);
    }
    if (minreq) {
      addMinReq(minreq);
    }
    if (val && max) {
      changeCount(max - val);
      changeRightBtnDisable(val <= 0);
    }
    if (minVal) {
      changeRightBtnDisable(value <= minVal);
      addMinValue(minVal);
    }
    if (disabledColor) {
      addDisableColor(disabledColor);
    }
    if (activeColor) {
      addActiveColor(activeColor);
    }
  }, [val, max, minreq, minVal, disabledColor, activeColor]);

  // Function to handle button click
  const handlePress = (val) => {
    handleClick ? handleClick(val) : {};
  };

  return (
    <View style={styles.viewOuter}>
      <View
        style={[
          styles.viewBtnRight,
          {
            backgroundColor:
              rightBtnDisable || disableControl ? disableColorBtn : activeColorBtn,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRadius: 5,
          },
          styleBtn,
        ]}
      >
        <TouchableOpacity
          labelStyle={labelStyle ? labelStyle : styles.labelStyle}
          disabled={rightBtnDisable || disableControl}
          color={'#ffffff'}
          onPress={() => {
            if (value - 1 <= min || value - 1 < minReq) {
              changeLeftBtnDisable(false);
              changeRightBtnDisable(true);
              if (value - 1 <= min) {
                changeValue(value - 1);
                changeCount(count + 1);
                handlePress(value - 1);
              }
              if (value - 1 < minReq) {
                changeCount(count + minReq);
                changeValue(0);
                handlePress(0);
              }
            } else {
              changeLeftBtnDisable(false);
              changeCount(count + 1);
              changeValue(value - 1);
              handlePress(value - 1);
            }
          }}
        >
          <AntDesign name="minus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={[styles.viewTextInput, styleTextInput]}>
        <Text style={[{ color: '#000000' }, labelStyle ? labelStyle : styles.labelStyle]}>
          {value}
        </Text>
      </View>
      <View
        style={[
          styles.viewBtnLeft,
          {
            backgroundColor:
              leftBtnDisable || disableControl ? disableColorBtn : activeColorBtn,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderRadius: 5,
          },
          styleBtn,
        ]}
      >
        <TouchableOpacity
          labelStyle={labelStyle ? labelStyle : styles.labelStyle}
          disabled={leftBtnDisable || disableControl}
          color={'#ffffff'}
          onPress={() => {
            if (count - 1 <= 0) {
              changeCount(0);
              changeRightBtnDisable(false);
              changeLeftBtnDisable(true);
              changeValue(value + 1);
              handlePress(value + 1);
            } else {
              if (value < minReq) {
                changeCount(count - minReq);
                changeValue(value + minReq);
                handlePress(value + minReq);
              } else {
                changeCount(count - 1);
                changeValue(value + 1);
                handlePress(value + 1);
              }
              changeRightBtnDisable(false);
            }
          }}
        >
          <Entypo name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RnIncrementDecrementBtn;

let { height } = Dimensions.get('window');
let { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  viewOuter: {
    flexDirection: 'row',
  },
  viewBtnLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    height: PixelRatio.roundToNearestPixel((height * 5) / 100),
    width: PixelRatio.roundToNearestPixel((width * 8) / 100),
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderTopLeftRadius: PixelRatio.roundToNearestPixel((height * 1) / 100),
    borderBottomLeftRadius: PixelRatio.roundToNearestPixel((height * 1) / 100),
  },
  viewBtnRight: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eeeeee',
    height: PixelRatio.roundToNearestPixel((height * 5) / 100),
    width: PixelRatio.roundToNearestPixel((width * 8) / 100),
    borderTopRightRadius: PixelRatio.roundToNearestPixel((height * 1) / 100),
    borderBottomRightRadius: PixelRatio.roundToNearestPixel((height * 1) / 100),
  },
  viewTextInput: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#eeeeee',
    height: PixelRatio.roundToNearestPixel((height * 5) / 100),
    width: PixelRatio.roundToNearestPixel((width * 8) / 100),
  },
  labelStyle: {
    fontSize: 16,
  },
});
