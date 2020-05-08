import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {AssetSnapshot} from '../asset-snapshot/asset-snapshot';
import {Title1, Callout} from '../typography/typography';

export const AssetCard = ({code, name, marketValue, updatedTime, lastPrice, shares, id, onCardPress}) => {

    const assetInfo = {marketValue, updatedTime, lastPrice, shares};

    return (
        <TouchableOpacity style={styles.wrap} onPress={()=>onCardPress()}>
            <View>
                <View style={styles.header}>
                    <Title1 style={styles.title1} nativeID={`code`}>{code}</Title1>
                    <Callout style={styles.callout} nativeID={`name`}>{name}</Callout>
                </View>
                <View style={styles.body}>
                    <AssetSnapshot {...assetInfo}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrap: {
        marginBottom: 16
    },
    header: {
        backgroundColor: 'rgb(0,114,191)',
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    body: {
        backgroundColor: '#fff',
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
        flexDirection: 'row',
    },
    title1: {
        color: '#fff',
        fontWeight: '500'
    },
    callout: {
        color: '#fff',
        fontWeight: '500'
    }
});
