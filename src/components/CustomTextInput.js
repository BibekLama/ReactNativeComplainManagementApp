import React,{Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';


export default class CustomTextInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            placeholder: this.props.placeholder,
            keyboardType: this.props.keyboardType
        };
    }

    render(){
        const {placeholder, text, keyboardType} = this.state;
        const {placeholderColor, multiline=false,inputStyle,value,onChangeText} = this.props;

        return(
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                keyboardType={keyboardType}
                underlineColorAndroid="transparent"
                multiline = {multiline}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        );
    }
}
