import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import {Headline, SharesCard} from '../../../components';
import Assets from '../../../../../mock/assets';

const Home = () => {
    const [shares, setShares] = useState([]);

    useEffect(() => {
        const assets = [];
        Array.from({ length: 50 }, () => {
            const asset = Assets.assets[~~(Assets.assets.length * Math.random())];
            const id = {id: new Date().getTime()};
            assets.push({...asset, id})
        });

        setShares(assets);
    }, []);

    return (
        <Container style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView}>
                    <Content style={styles.body}>
                        <Headline style={styles.headline}>shares</Headline>
                        <FlatList
                            data={shares}
                            renderItem={({ item }) =><SharesCard {...item}/>}
                            keyExtractor={item => item.id}
                        />
                    </Content>
                </ScrollView>
            </SafeAreaView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(235, 239, 242)'
    },
    safeArea: {
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
    body: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16
    },
    headline: {
        marginBottom: 21,
        textTransform: 'uppercase',
        color: 'rgb(91, 103, 112)',
        fontWeight: '500'
    }
});

export default Home;
