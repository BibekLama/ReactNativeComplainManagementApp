import React, {PureComponent} from 'react';
import {
    Platform,
    StyleSheet, 
    NativeModules,
    View, 
    Text
} from 'react-native';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight() : StatusBarManager.HEIGHT;

export default class AppBar extends PureComponent{
    render(){
        return(
            <View style={styles.appBar}>
                {this.props.leftContent &&
                    <View style={styles.appBarLeft}>
                        {this.props.leftContent}
                    </View>
                }
                {this.props.rightContent &&
                    <View style={styles.appBarRight}>
                        {this.props.rightContent}
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    appBarRight:{
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'row',
    },
});