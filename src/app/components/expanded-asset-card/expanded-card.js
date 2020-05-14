import React, {useLayoutEffect, useRef} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Image, Animated, Dimensions, Easing} from 'react-native';
import {Title1, Callout} from '../typography/typography';
import {AssetSnapshot} from '../asset-snapshot/asset-snapshot';
import {CloseButton} from '../close-button/close-button';

const {width} = Dimensions.get('window');

export const ExpandedAssetCard = (props) => {
    const ribbonTopAnim = useRef(new Animated.Value(props.pageY)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useLayoutEffect(() => {
        Animated.timing(ribbonTopAnim, {
            toValue: 195,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.in(Easing.elastic(1))
        }).start();

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.top}/>
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false} >
                    <View style={styles.card}>
                        <CloseButton componentId={props.componentId}/>
                        <View style={[styles.header]}>
                            <Animated.View style={[styles.ribbonContainer, {top: ribbonTopAnim}]} nativeID={'ribbonContainer'}>
                                <View style={styles.ribbon}>
                                    <AssetSnapshot {...props}/>
                                </View>
                            </Animated.View>
                            <Animated.View nativeID={'headerContainer'} style={{opacity: fadeAnim}}>
                                <View style={[styles.chart]}>
                                    <Image source={require('../../../../assets/images/chart/chart.png')}/>
                                </View>
                                <Title1 style={[styles.title1]} nativeID={'code'}>{props.code}</Title1>
                                <Callout style={[styles.callout]} nativeID={'name'}>{props.name}</Callout>
                            </Animated.View>
                        </View>
                        <View style={styles.bodyContainer}>
                            <View style={styles.body}/>
                        </View>
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
    card: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(0, 114, 191)',
    },
    navBar: {
        backgroundColor: 'rgb(0, 114, 191)',
    },
    ribbonContainer: {
        height: 90,
        width: width - 32,
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1
    },
    ribbon: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
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
        height: 240,
        paddingLeft: 32,
        paddingRight: 32,
        position: 'relative',
        zIndex: 1
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
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgb(235, 239, 242)',
        paddingTop: 65
    },
    body: {
        backgroundColor: 'white',
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 10,
        width: width - 32,
        height: 400
    },
    listItem: {
        flex: 0.33
    }
});
