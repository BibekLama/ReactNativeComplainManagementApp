import React,{Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';


export default class CustomTextInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: "",
            placeholder: this.props.placeholder,
            keyboardType: this.props.keyboardType
        };
    }

    onChangeText = (text) => {
        this.setState({text});
    }

    render(){
        const {placeholder, text, keyboardType} = this.state;
        const {placeholderColor, multiline=false,inputStyle} = this.props;

        return(
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                keyboardType={keyboardType}
                underlineColorAndroid="transparent"
                onChangeText={(t) => this.onChangeText(t)}
                value={text}
                multiline = {multiline}
                style={inputStyle}
            />
        );
    }
}
