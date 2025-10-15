import { StyleSheet } from 'react-native';
import { DefaultAppColors } from './DefaultColors';


export const CheckpointStyle = StyleSheet.create({
    MapContainer: {
        height: '50%',
        width: '100%',
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: DefaultAppColors.color.defaultBlack,
        overflow: 'hidden',
    },

    ChekcpointInfoContainer: {
        width: '100%',
        height: '5%',
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    Button: {
        backgroundColor: DefaultAppColors.color.defaultGray,
        width: '100%',
        height: 65,
        borderRadius: 20,
        justifyContent: 'center',
        borderBlockColor: DefaultAppColors.color.defaultBlack,
        marginTop: 10,
    },

    QRInfoText: {
        marginTop: 10,
        fontSize: 12,
        color: '#666',
        textAlign: 'center'
    },

    QRLabelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },

    CheckPointInfoContainer: {
        width: '40%',
        height: '100%',
        borderBottomColor: DefaultAppColors.color.defaultBlack,
        borderBottomWidth: 2,
    },

    GetCurrentCoordsButton: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        textAlign: 'center',

    },

    GetCurrentLocationIconButton: {
        height: 50,
        width: 50,
    },

    MapPreviewStyle: {
        height: '100%',
        width: '100%'
    },

    QRCodePreview: {
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: DefaultAppColors.color.defaultWhite,
        paddingVertical: 20,
        paddingHorizontal: '5%',
        borderRadius: 10,
        width: '100%',
    },

});