import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Title1, Callout, Title3, Caption2} from '../typography/typography';

export const SharesCard = ({code, name, marketValue, updatedTime, lastPrice, shares}) => {
    return (
        <TouchableOpacity style={styles.wrap}>
            <View>
                <View style={styles.header}>
                    <Title1 style={styles.title1}>{code}</Title1>
                    <Callout style={styles.callout}>{name}</Callout>
                </View>
                <View style={styles.body}>
                    <View style={styles.infoBlock}>
                        <Title3 style={styles.title3}>${marketValue}</Title3>
                        <Caption2 style={styles.caption2}>market value</Caption2>
                    </View>
                    <View style={styles.infoBlock}>
                        <Title3 style={styles.title3}>{shares}</Title3>
                        <Caption2 style={styles.caption2}>Shares</Caption2>
                    </View>
                    <View style={styles.infoBlock}>
                        <Title3 style={styles.title3}>${lastPrice}</Title3>
                        <Caption2 style={styles.caption2}>latest price</Caption2>
                        <Caption2 style={[styles.caption2, {color: 'rgb(91,103, 112)'}]}>({updatedTime})</Caption2>
                    </View>
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
    },
    infoBlock: {
        flex: 1,
        alignItems: 'center',
    },
    caption2: {
        textTransform: 'uppercase'
    },
    title3: {
        fontWeight: '500'
    }
});
