import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import {Headline, AssetCard,ScrollLayout} from '../../../components';
import Assets from '../../../../../mock/assets';
import {Navigation} from 'react-native-navigation';

const MULTIPLIER = 1.15;
const LONG_DURATION = 350 * MULTIPLIER;
const SHORT_DURATION = 190 * MULTIPLIER;

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

    const onCardPress = (asset) => {
        Navigation.push(componentId, {
            component: {
                name: 'secure.trading',
                passProps: { ...asset },
                options: {
                    animations: {
                        push: {
                            content: {
                                alpha: {
                                    from: 0,
                                    to: 1,
                                    duration: LONG_DURATION
                                }
                            },
                            elementTransitions: [

                            ]
                        },
                        pop: {
                            content: {
                                alpha: {
                                    from: 0,
                                    to: 1,
                                    duration: LONG_DURATION
                                }
                            },
                            elementTransitions: [

                            ]
                        }
                    }
                }
            }
        });
    };

    return (
        <ScrollLayout>
            <Headline style={styles.headline}>shares</Headline>
            {shares.map(props => <AssetCard onCardPress={()=> onCardPress(props)} {...props} key={props.id}/>)}
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
