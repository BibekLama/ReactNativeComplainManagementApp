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
        const {title, color, radius, titleSize, titleColor, onPress} = this.props;

        return(
            <TouchableOpacity style={[
                styles.container, 
                {
                    backgroundColor:color, 
                    borderRadius:radius, 
                }
            ]}
            onPress = {() => onPress()}
            >
                <Text style={{
                    fontSize: titleSize, 
                    color: titleColor, 
                    fontWeight:'bold'}}
                >
                    {title}</Text>
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