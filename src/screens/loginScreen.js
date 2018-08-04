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
                    backgroundColor="transparent"
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
                        bgColor = "rgba(0,0,0,0.5)"
                        radius = {8}
                        color= 'white'
                        placeholderColor = '#e5e5e5'
                    />
                    <CustomTextInput
                        placeholder="MOBILE NUMBER"
                        keyboardType = "phone-pad"
                        bgColor = "rgba(0,0,0,0.5)"
                        radius = {8}
                        color = 'white'
                        placeholderColor = '#e5e5e5'
                    />

                    <CustomButton
                        onPress={this.handleSubmitButton.bind(this)}
                        title="SUBMIT"
                        color="#13244f"
                        radius={8}
                        titleSize={16}
                        titleColor= "#FFFFFF"
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
    submitButton: {
        width:'100%',
        height:40
    }
});
  