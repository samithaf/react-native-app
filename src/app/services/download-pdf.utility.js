import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, PermissionStatus, Platform } from 'react-native';

const requestWritePermission = async (): Promise<void> => {
  const granted: PermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error('Permission denied');
  }
};

export const downloadPDF = async (url: string, fileName: string): Promise<void> => {
  const mime = 'application/pdf';
  const path = `${RNFetchBlob.fs.dirs.DownloadDir}/${encodeURIComponent(fileName)}.pdf`;

  if (Platform.OS === 'android') {
    await requestWritePermission();
  }

  const res = await RNFetchBlob.config({
    fileCache: true,
    indicator: true,
    path
  }).fetch('GET', url);

  // Sometimes backend sends a 200 with error page
  if (res.respInfo.status === 200) {
    const isValidPDF = Object.entries(res.respInfo.headers).some(([key, value]) => /content-type/gi.test(key) && value === mime);
    if (!isValidPDF) {
      throw new Error(`Failed to download ${fileName}`);
    }
  }

  if (Platform.OS === 'ios') {
    RNFetchBlob.ios.openDocument(path);
  } else {
    RNFetchBlob.android.actionViewIntent(path, mime);
  }
};
