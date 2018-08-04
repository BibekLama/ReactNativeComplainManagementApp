import React, {PureComponent} from 'react';
import {
    Platform, 
    Dimensions,
    StyleSheet, 
    Text, 
    ImageBackground,
    StatusBar,
    View,
    Image
} from 'react-native';

import {Avatar} from 'react-native-elements';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const BG_URL = require('../assets/imgs/login_bg.jpg');

export default class App extends PureComponent {

    handleSubmitButton(){
        this.props.navigation.navigate('ComplainList');
    }


    render(){
        return(
            <ImageBackground
                source={BG_URL}
                style={styles.container}
            > 
                <StatusBar
                    backgroundColor="#f7b935"
                    barStyle="dark-content"
                    translucent={true}
                />
                <View style={styles.topSection}>
                    <Avatar
                        large
                        rounded
                        title="LOGO"
                        titleStyle={styles.logoText}
                        onPress={() => console.log("Works!")}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                        activeOpacity={0.7}
                        containerStyle={styles.logo}
                    />
                    <Image
                        style={styles.appTitle}
                        source={require('../assets/imgs/appTitle.png')}
                    />
                </View>
                <View style={styles.bottomSection}>
                    <CustomTextInput
                        placeholder="FULLNAME"
                        keyboardType = "default"
                        placeholderColor = '#e5e5e5'
                        inputStyle={styles.inputStyle}
                    />
                    <CustomTextInput
                        placeholder="MOBILE NUMBER"
                        keyboardType = "phone-pad"
                        placeholderColor = '#e5e5e5'
                        inputStyle={styles.inputStyle}
                    />

                    <CustomButton
                        onPress={this.handleSubmitButton.bind(this)}
                        title="SUBMIT"
                        titleStyle = {styles.buttonTitle}
                        buttonStyle = {styles.buttonStyle}
                    />
                </View>
            </ImageBackground>
        )
    }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 30
    },
    topSection: {
        flex: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomSection: {
        width:'100%',
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginBottom:15
    },
    logoText: {
        fontSize: 12,
        color: '#05285b'
    },
    appTitle: {
        width:width-48,
        height: 22
    },
    appSubTitle: {
        fontSize: 14,
        color: '#ffffff'
    },
    inputStyle:{
        width:'100%',
        marginVertical:8,
        borderColor:'#fff',
        color:'#fff',
        borderWidth:1,
        borderRadius:8,
        backgroundColor:'rgba(0,0,0,0.1)',
        paddingHorizontal:10
    },
    buttonStyle: {
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginVertical: 15,
        backgroundColor:'#13244f', 
        borderRadius:8, 
    },
    buttonTitle:{
        color: '#FFF',
        fontSize:16,
        fontWeight:'bold'
    }
});
  