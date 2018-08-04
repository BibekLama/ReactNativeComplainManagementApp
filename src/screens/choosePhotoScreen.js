import React, {PureComponent} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    NativeModules,
    StatusBar,
    View,
    Image,
    ScrollView
} from 'react-native';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight() : StatusBarManager.HEIGHT;

export default class ChoosePhotoScreen extends PureComponent{
    
    render() {
        const photos = this.props.navigation.getParam('photos');
        return (
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
                    <ScrollView style={styles.scrollViewContainer}>
                        {photos.map((p, i) => {
                            return (
                                <Image
                                    key={i}
                                    style={{
                                        width: 300,
                                        height: 100,
                                    }}
                                    source={{ uri: p.node.image.uri }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        );
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
});