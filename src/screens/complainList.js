import React, {PureComponent} from 'react';
import {
    StyleSheet, 
    BackHandler, 
    StatusBar, 
    View, 
    Text,
    FlatList
} from 'react-native';
import {
    Avatar
} from 'react-native-elements';

import AppBar from '../components/AppBar';

import RippleIcon from '../components/RippleIcon';
import ComlpainListItem from '../components/ComplainListItem';

import _data from '../constants/complainDatas';

export default class ComplainList extends PureComponent{

    static navigationOptions = {
        title: 'Complain List',
    };

    

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
        // this.props.navigation.goBack(null);
        // return false;
        BackHandler.exitApp();
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
       this.props.navigation.navigate('ComplainScreen', {item});
    };

    _renderItem = ({item}) => (
        <ComlpainListItem
          id={item.id}
          onPressItem={this._onPressItem}
          item={item}
        />
    );

    _onAddButtonPressed = () => {
        this.props.navigation.navigate('AddComplainScreen');
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
                        <Avatar
                            key={1}
                            small
                            rounded
                            title="LOGO"
                            titleStyle={styles.logoText}
                            onPress={() => console.log("Works!")}
                            overlayContainerStyle={{backgroundColor: 'white'}}
                            activeOpacity={0.7}
                            containerStyle={styles.logo}
                        />,
                        <Text key={2} style={styles.headerTitle}>Complain List</Text>
                    ]}
                    rightContent={[
                        <RippleIcon key={1} type="ionicon" name="ios-add" size={24} color="#05285b" onPress={()=>this._onAddButtonPressed()} />
                    ]}
                />
                <View style={styles.contentBody}>
                    <FlatList
                        data={_data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        style={styles.complainList}
                    />
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
    logo: {
        marginHorizontal:10
    },
    logoText: {
        fontSize: 12,
        color: '#05285b'
    },
    headerTitle:{
        fontSize:16,
        fontWeight: 'bold',
        color: '#05285b',
    },
    complainList: {
        paddingVertical:10
    }
});