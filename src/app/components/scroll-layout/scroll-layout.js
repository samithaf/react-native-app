import {Container, Content} from 'native-base';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';

export const ScrollLayout = ({children}) => {
    return (
        <Container style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView}>
                    <Content style={styles.body}>
                        {children}
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
        flex: 1
    },
    headline: {
        marginBottom: 21,
        textTransform: 'uppercase',
        color: 'rgb(91, 103, 112)',
        fontWeight: '500'
    }
});

