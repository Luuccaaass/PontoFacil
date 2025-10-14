import { StyleSheet } from 'react-native'
import { DefaultAppColors } from './DefaultColors'

export default StyleSheet.create({
  qrScanContainer: {
    flex: 1,
    backgroundColor: DefaultAppColors.color.defaultBlack,
  },
  QRCodeScannerContainer: {
    flex: 1,
    backgroundColor: DefaultAppColors.color.defaultBlack,
  },

  QRCodeScannerText: {
    color: DefaultAppColors.color.defaultWhite,
    fontSize: 16,
  },
})