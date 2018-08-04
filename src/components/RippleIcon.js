import React,{PureComponent} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import {Icon} from 'react-native-elements';

const maxOpacity = 0.12;

export default class RippleIcon extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            maxOpacity,
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(maxOpacity),
        };

        this.renderRippleView = this.renderRippleView.bind(this);
        this.onPressedIn = this.onPressedIn.bind(this);
        this.onPressedOut = this.onPressedOut.bind(this);
    }

    onPressedIn() {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        }).start();
    }
    onPressedOut() {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
        }).start(() => {
            this.state.scaleValue.setValue(0.01);
            this.state.opacityValue.setValue(this.state.maxOpacity);
            this.props.onPress();
        });
    }
    renderRippleView() {
        const { size } = this.props;
        const { scaleValue, opacityValue } = this.state;
        const rippleSize = size * 2;
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    zIndex:9999,
                    width: rippleSize,
                    height: rippleSize,
                    alignItems:'center',
                    borderRadius: rippleSize / 2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: 'black',
                }}
            />
        );
    }

    render(){
        const { type, name, size, color, iconStyle } = this.props;
        const containerSize = size * 2;
        const iconContainer = { width: containerSize, height: containerSize };
        
        return (
            <TouchableWithoutFeedback onPressIn={this.onPressedIn} onPressOut={this.onPressedOut}>
                <View style={[styles.iconContainer, iconContainer, iconStyle]}>
                    {this.renderRippleView()}
                    <View>
                        <Icon type={type} name={name} size={size} color={color}  />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});