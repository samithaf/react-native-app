import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Headline, AssetCard, ScrollLayout, Fab} from '../../../components';
import Assets from '../../../../../mock/assets';

const MULTIPLIER = 1.15;
const SHORT_DURATION = 100 * MULTIPLIER;

const Home = ({componentId}) => {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    const assets = [];
    Array.from({length: 50}, (o, i) => {
      const asset = Assets.assets[~~(Assets.assets.length * Math.random())];
      const id = `${i}`;
      assets.push({...asset, id});
    });

    setShares(assets);
  }, []);

  const onCardPress = (elRef, asset) => {
    elRef.current.measure((x, y, width, height, pageX, pageY) => {
      const position = {width, height, pageX, pageY};
      Navigation.push(componentId, {
        component: {
          name: 'secure.trading',
          passProps: {...asset, ...position},
          options: {
            animations: {
              push: {
                enabled: true,
                content: {
                  alpha: {
                    from: 0,
                    to: 1,
                    duration: SHORT_DURATION,
                  },
                },
              },
              pop: {
                enabled: false,
                content: {
                  alpha: {
                    from: 0,
                    to: 1,
                    duration: SHORT_DURATION,
                  },
                },
              },
            },
          },
        },
      });
    });
  };

  return (
    <>
      <ScrollLayout>
        <Headline style={styles.headline}>shares</Headline>
        {shares.map((props) => (
          <AssetCard
            onCardPress={(elRef) => onCardPress(elRef, props)}
            {...props}
            key={props.id}
          />
        ))}
      </ScrollLayout>
      <Fab />
    </>
  );
};

const styles = StyleSheet.create({
  headline: {
    marginBottom: 21,
    textTransform: 'uppercase',
    color: 'rgb(91, 103, 112)',
    fontWeight: '500',
    fontFamily: 'HelveticaNeue-Italic',
  },
});

Home.options = {
  bottomTab: {
    icon: require('../../../../../assets/images/tab_overview/tab_overview.png'),
    selectedIcon: require('../../../../../assets/images/tab_overview/tab_overview_on.png'),
    text: 'Overview',
  },
};

export default Home;
