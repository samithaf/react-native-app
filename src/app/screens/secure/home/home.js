import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import {Headline, AssetCard,ScrollLayout} from '../../../components';
import Assets from '../../../../../mock/assets';
import {Navigation} from 'react-native-navigation';

const MULTIPLIER = 1.15;
const LONG_DURATION = 350 * MULTIPLIER;
const SHORT_DURATION = 100 * MULTIPLIER;

const Home = ({componentId}) => {
    const [shares, setShares] = useState([]);

    useEffect(() => {
        const assets = [];
        Array.from({ length: 50 }, (o, i) => {
            const asset = Assets.assets[~~(Assets.assets.length * Math.random())];
            const id = `${i}`;
            assets.push({...asset, id});
        });

        setShares(assets);
    }, []);

    const onCardPress = (elRef, asset) => {
        elRef.current.measure((x, y, width, height, ribbonX, ribbonY) => {
            const position = { width, height, ribbonX, ribbonY };
            Navigation.push(componentId, {
                component: {
                    name: 'secure.trading',
                    passProps: { ...asset, ...position },
                    options: {
                        animations: {
                            push: {
                                enabled: true,
                                content: {
                                    alpha: {
                                        from: 0,
                                        to: 1,
                                        duration: SHORT_DURATION
                                    }
                                },
                                sharedElementTransitions: [

                                ]
                            },
                            pop: {
                                content: {
                                    alpha: {
                                        from: 0,
                                        to: 1,
                                        duration: SHORT_DURATION
                                    }
                                }
                            }
                        }
                    }
                }
            });
        });
    };

    return (
        <ScrollLayout>
            <Headline style={styles.headline}>shares</Headline>
            {shares.map(props => <AssetCard onCardPress={elRef => onCardPress(elRef, props)} {...props} key={props.id}/>)}
        </ScrollLayout>
    );
};

const styles = StyleSheet.create({
    headline: {
        marginBottom: 21,
        textTransform: 'uppercase',
        color: 'rgb(91, 103, 112)',
        fontWeight: '500'
    }
});

export default Home;
