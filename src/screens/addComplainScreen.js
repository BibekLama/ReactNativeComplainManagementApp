import React,{PureComponent} from 'react';
import {
    Platform,
    StyleSheet,
    BackHandler,
    StatusBar,
    NativeModules,
    View,
    Text,
    Picker,
    ScrollView
} from 'react-native';


import RippleIcon from '../components/RippleIcon';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight() : StatusBarManager.HEIGHT;


export default class AddComponent extends PureComponent{

    _didFocusSubscription;
    _willBlurSubscription;
    
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.state = {
            complainType : "electricity"
        };
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    _onBackIconPress(){
        this.props.navigation.goBack();
    }

    handleSubmitButton(){
        this.props.navigation.navigate('ComplainList');
    }

    _handlePhotoButtonPress = () => {
        // CameraRoll.getPhotos({
        //     first: 20,
        //     assetType: 'Photos',
        // })
        // .then(r => {
        //     this.props.navigation.navigate('ChoosePhotoScreen', {photos: r.edges});
        //     // this.setState({ photos: r.edges });
        // })
        // .catch((err) => {
        //     //Error Loading Images
        //     alert("Error Loading Images")
        // });
    };

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#efbd52"
                    barStyle="dark-content"
                    translucent={true}
                />
                <View style={styles.contentBody}>
                    <View style={styles.appBar}>
                        <View style={styles.appBarLeft}>
                            <RippleIcon type="ionicon" name="md-arrow-back" size={24} color="#05285b" onPress={()=> this._onBackIconPress()} />
                            <Text style={styles.headerTitle}>New Complain</Text>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <Text style={styles.label}>Complain Type</Text>
                        <View style={styles.inputPicker}>
                            <Picker
                                selectedValue={this.state.complainType}
                                style={{width:'100%'}}
                                onValueChange={(itemValue, itemIndex) => this.setState({complainType: itemValue})}>
                                <Picker.Item label="Electricity" value="electricity" />
                                <Picker.Item label="Internet" value="internet" />
                                <Picker.Item label="Health" value="health" />
                                <Picker.Item label="Telephone" value="telephone" />
                                <Picker.Item label="Road and Construction" value="road & construction" />
                            </Picker>
                        </View>
                        <Text style={styles.label}>Complain Description</Text>
                        <CustomTextInput
                            placeholder="Write description..."
                            keyboardType = "default"
                            placeholderColor = '#999'
                            multiline = {true}
                            inputStyle = {styles.inputStyle}
                        />
                        <CustomButton
                            onPress={this._handlePhotoButtonPress.bind(this)}
                            title="Choose Photo"
                            titleStyle = {styles.imageChooseTitle}
                            buttonStyle = {styles.imageChooseStyle}
                        />
                        <CustomButton
                            onPress={this.handleSubmitButton.bind(this)}
                            title="SUBMIT"
                            titleStyle = {styles.submitTitle}
                            buttonStyle = {styles.submitStyle}
                        />
                    </ScrollView>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    contentBody:{
        flex:1,
        width:'100%',
        backgroundColor: '#e5e5e5'
    },
    appBar: {
        width:'100%',
        height:50,
        backgroundColor: '#fbc654',
        marginTop: STATUSBAR_HEIGHT,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        elevation:3,
    },
    appBarLeft:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    headerTitle:{
        fontSize:16,
        fontWeight: 'bold',
        color: '#05285b',
    },
    scrollViewContainer:{
        flex:1,
        flexGrow:1,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingVertical:20,
        paddingHorizontal:20,
    },
    label:{
        marginVertical:10,
    },
    inputStyle:{
        width:'100%',
        minHeight:100,
        borderColor:'#bbb',
        color:'#05285b',
        borderWidth:1,
        borderRadius:3,
        backgroundColor:'transparent',
        paddingHorizontal:15
    },
    inputPicker: {
        width:'100%',
        borderWidth:1,
        borderColor: '#bbb',
        borderRadius:3,
        paddingHorizontal:5
    },
    imageChooseStyle: {
        width:'100%',
        height:50,
        alignItems:'flex-start',
        justifyContent:'center',
        marginVertical: 15,
        backgroundColor:'#eee', 
        borderRadius:3, 
        paddingHorizontal:15
    },
    imageChooseTitle:{
        color: '#666',
        fontSize:16,
        fontWeight:'bold'
    },
    submitStyle: {
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginVertical: 15,
        backgroundColor:'#13244f', 
        borderRadius:3, 
    },
    submitTitle:{
        color: '#FFF',
        fontSize:16,
        fontWeight:'bold'
    }
});