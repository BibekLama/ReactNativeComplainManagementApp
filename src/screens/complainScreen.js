import React, {PureComponent} from 'react';
import {
    Platform,
    StyleSheet, 
    BackHandler, 
    StatusBar, 
    NativeModules,
    View, 
    Text,
    ScrollView,
    Image
} from 'react-native';
import {Icon,Avatar} from 'react-native-elements';
import RippleIcon from '../components/RippleIcon';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight() : StatusBarManager.HEIGHT;


export default class ComplainScreen extends PureComponent{

    _didFocusSubscription;
    _willBlurSubscription;
    
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
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

    render(){
        const item = this.props.navigation.getParam('item');
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#d79b18"
                    barStyle="light-content"
                    translucent={true}
                />
                <View style={styles.contentBody}>
                    <View style={styles.appBar}>
                        <View style={styles.appBarLeft}>
                            <RippleIcon type="ionicon" name="md-arrow-back" size={24} color="#05285b" onPress={()=> this._onBackIconPress()} />
                            <Text style={styles.headerTitle}>Complain</Text>
                        </View>
                        {/* <View style={styles.appBarLeft}>
                            <RippleIcon type="ionicon" name="ios-trash" size={24} color="#05285b" onPress={()=>alert("delete complain")} />
                            <RippleIcon type="ionicon" name="ios-checkmark-circle-outline" size={24} color="#05285b" onPress={()=>alert("delete complain")} />
                        </View> */}
                    </View>
                    
                    <ScrollView contentContainerStyle={styles.complainContainer}>
                        <Avatar
                            large
                            rounded
                            icon={{type: 'ionicon', name: 'md-person'}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            containerStyle={styles.avatar}
                        />
                        <Text style={styles.nameText}>{item.name}</Text>
                        
                        <View style={styles.descriptionBox}>
                            <Text style={styles.subTitle}>
                                Complained about 
                                <Text style={{fontWeight:'bold'}}> {item.type}</Text> on 
                                <Text style={{fontWeight:'bold'}}> 3 Aug 2018</Text>
                            </Text>
                            <Image
                                style={styles.image}
                                source={item.image}
                            />
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
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
    complainContainer:{
        flex:1,
        flexGrow:1,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingVertical:20,
    },
    avatar: {
        marginTop:20
    },
    nameText:{
        fontSize:16,
        fontWeight:'bold',
        marginTop:8
    },
    subTitle: {
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:1,
        paddingVertical:10,
    },
    descriptionBox: {
        flex:1,
        flexGrow:1,
        padding:15,
        backgroundColor:'#eeeeee',
        marginTop:15,
    },
    description: {
        marginVertical:10
    },
    image:{
        marginVertical:10,
        width:'auto',
        height:150
    }
});