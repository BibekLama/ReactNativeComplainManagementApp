import React,{Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';


export default class CustomButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    onChangeText = (text) => {
        this.setState({text});
    }

    render(){
        const {placeholder, text, keyboardType} = this.state;
        const {title, onPress, buttonStyle, titleStyle} = this.props;

        return(
            <TouchableOpacity style={buttonStyle}
            onPress = {() => onPress()}
            >
                <Text style={titleStyle}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginVertical: 15
    }
});