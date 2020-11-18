import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Title3} from '../../../components';
import {downloadPDF} from '../../../services/download-pdf.utility';

const tab_more = require('../../../../../assets/images/tab_more/tab_more.png');
const annuity = require('../../../../../assets/images/annuity/icon-accountAnnuity.png');

export const TransactionsScreen = ({componentId}) => {
  const url = 'https://www.bt.com.au/content/dam/public/btfg-bt/documents/professional/support/pdf/pension_minimum_EOFY_for_clients.pdf';
  const fileName = url.substring(url.lastIndexOf('/') + 1);

  const downloadAlert = async () => {
    try {
      await downloadPDF(url, fileName);
    } catch (e) {
      Alert.alert(e.toString());
    }
  };
  const onPress = () => {
    Navigation.push(componentId, {
      component: {
        name: 'secure.transactionDetails',
        options: {
          bottomTabs: {
            visible: false,
          },
          topBar: {
            visible: true,
          },
        },
      },
    });
  };
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Transactions Screen</Text>
      <TouchableOpacity onPress={() => onPress()}>
        <Title3>Go to details</Title3>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => downloadAlert()}>
        <Title3>Download a file</Title3>
      </TouchableOpacity>
    </View>
  );
};
TransactionsScreen.options = {
  topBar: {
    title: {
      text: 'Transactions',
    },
  },
  bottomTab: {
    text: 'Transactions',
    icon: require('../../../../../assets/images/tab_transactions/tab_transactions.png'),
    selectedIcon: require('../../../../../assets/images/tab_transactions/tab_transactions_on.png'),
  },
};

export const TransactionDetailsScreen = ({componentId}) => {
  return (
    <View style={styles.root}>
      <Text>Transaction Details Screen</Text>
    </View>
  );
};
TransactionDetailsScreen.options = {
  topBar: {
    visible: true,
    backButton: {
      title: '',
    },
    title: {
      text: 'Transaction Details',
    },
  },
};

export const InvestmentsScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Investments Screen</Text>
    </View>
  );
};
InvestmentsScreen.options = {
  bottomTab: {
    text: 'Investments',
    icon: require('../../../../../assets/images/tab_investments/tab_investments.png'),
    selectedIcon: require('../../../../../assets/images/tab_investments/tab_investments_on.png'),
  },
};

export const AlertsScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Alerts Screen</Text>
      <Text style={{fontSize: 22}}>more details..</Text>
      <Text style={{fontFamily: 'HelveticaNeue-Medium', fontSize: 22}}>
        HelveticaNeue Medium font..
      </Text>
    </View>
  );
};
AlertsScreen.options = {
  topBar: {
    title: {
      text: 'Alerts',
    },
  },
  bottomTab: {
    badge: '8',
    animateBadge: true,
    text: 'Alerts',
    icon: require('../../../../../assets/images/tab_alerts/tab_alerts.png'),
    selectedIcon: require('../../../../../assets/images/tab_alerts/tab_alerts_on.png'),
  },
};

export const MoreScreen = () => {
  return (
    <View style={styles.root}>
      <Text>More Screen [expo update]</Text>
      <Image source={tab_more} />
      <Image source={annuity} />
    </View>
  );
};
MoreScreen.options = {
  bottomTab: {
    text: 'More',
    icon: require('../../../../../assets/images/tab_more/tab_more.png'),
    selectedIcon: require('../../../../../assets/images/tab_more/tab_more_on.png'),
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  text: {
    fontFamily: Platform.select({
      ios: 'HelveticaNeue-Medium',
      android: 'helvetica_neue_medium',
    }),
  },
});
