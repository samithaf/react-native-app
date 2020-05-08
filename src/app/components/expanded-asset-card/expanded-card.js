import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native';
import {Title1, Callout} from '../typography/typography';
import {AssetSnapshot} from '../asset-snapshot/asset-snapshot';
import {CloseButton} from '../close-button/close-button';

export const ExpandedAssetCard = (props) => {
    return (
        <>
            <SafeAreaView style={styles.top}/>
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false}>
                    <View style={styles.navBar}>
                        <CloseButton componentId={props.componentId}/>
                    </View>
                    <View style={styles.ribbonContainer}>
                        <View style={styles.ribbon}>
                            <AssetSnapshot {...props}/>
                        </View>
                    </View>
                    <View style={styles.header}>
                        <View style={styles.chart}>
                            <Image source={require('../../../../assets/images/chart/chart.png')}/>
                        </View>
                        <Title1 style={styles.title1} nativeID={'code'}>{props.code}</Title1>
                        <Callout style={styles.callout} nativeID={'name'}>{props.name}</Callout>
                    </View>
                    <View style={styles.body}>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    top: {
        backgroundColor: 'rgb(0, 114, 191)',
        flex: 0
    },
    container: {
        backgroundColor: 'rgb(235, 239, 242)',
        flex: 1
    },
    navBar: {
        backgroundColor: 'rgb(0, 114, 191)',
    },
    ribbonContainer: {
        height: 90,
        width: '100%',
        position: 'absolute',
        top: 250,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    ribbon: {
        backgroundColor: 'white',
        height: '100%',
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 24,
        paddingBottom: 24,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
    },
    header: {
        backgroundColor: 'rgb(0, 114, 191)',
        height: 250,
        paddingLeft: 32,
        paddingRight: 32
    },
    chart: {
        height: 120,
        paddingTop: 0
    },
    title1: {
        fontWeight: '500',
        color: '#fff'
    },
    callout: {
        fontWeight: '500',
        color: '#fff'
    },
    body: {
        flex: 1,
        flexDirection: 'row',
    },
    listItem: {
        flex: 0.33
    }
});
