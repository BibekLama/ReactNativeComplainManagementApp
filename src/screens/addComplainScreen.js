import React,{PureComponent} from 'react';
import {
    StyleSheet,
    BackHandler,
    StatusBar,
    View,
    Text,
    Picker,
    ScrollView,
    Modal,
    Dimensions,
    Image,
} from 'react-native';

import ImagePicker from "react-native-image-picker";

const { width } = Dimensions.get('window')


import RippleIcon from '../components/RippleIcon';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

import AppBar from '../components/AppBar';


export default class AddComponent extends PureComponent{

    _didFocusSubscription;
    _willBlurSubscription;
    
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.state = {
            complainType : "electricity",
            modalVisible: false,
            pickedImage: null
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

    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    reset = () => {
        this.setState({
          pickedImage: null
        });
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
          if (res.didCancel) {
            console.log("User cancelled!");
          } else if (res.error) {
            console.log("Error", res.error);
          } else {
            this.setState({
              pickedImage: { uri: res.uri }
            });  
          }
        });
    }

    resetHandler = () =>{
        this.reset();
    }
    

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#f7b935"
                    barStyle="dark-content"
                    translucent={true}
                />
                <AppBar
                    leftContent= {[
                        <RippleIcon key={1} type="ionicon" name="md-arrow-back" size={24} color="#05285b" onPress={()=> this._onBackIconPress()} />,
                        <Text key={2} style={styles.headerTitle}>New Complain</Text>
                    ]}
                />
                <View style={styles.contentBody}>
                    <ScrollView 
                        behaviour = "height"
                        contentContainerStyle={styles.scrollViewContainer}
                    >
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

                        <View style={styles.placeholder}>
                            <Image source={this.state.pickedImage} style={styles.previewImage} />
                        </View>
                        <CustomButton
                            onPress={() => this.pickImageHandler() }
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
    headerTitle:{
        fontSize:16,
        fontWeight: 'bold',
        color: '#05285b',
    },
    scrollViewContainer:{
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
    },
    placeholder: {
        marginTop:10, 
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    previewImage: {
        width: 267,
        height: 200
    }
});