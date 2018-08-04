import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import{Avatar} from 'react-native-elements';

export default class ComlpainListItem extends PureComponent{

    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };
    
    render(){
        const {item} = this.props;
        return(
            <TouchableOpacity onPress={this._onPress} style={styles.container}>
                <View style={styles.itemContainer}>
                    <Image
                        style={styles.image}
                        source={item.image}
                    />
                    <View style={styles.itemContent}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text>14 mins ago</Text>
                        <Text>Complain on {item.type}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        padding:15,
        marginVertical:8,
        backgroundColor:'#eee',
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    avatar: {

    },
    itemContent:{
        justifyContent:'center',
        marginHorizontal:10
    },
    nameText:{
        fontWeight:'bold'
    },
    image:{
        width:60,
        height:60
    }
});