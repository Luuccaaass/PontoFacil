import { StyleSheet } from "react-native";
import { DefaultAppColors } from "./DefaultColors";


export const CollabStyle = StyleSheet.create({
    cellId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: DefaultAppColors.color.laranjaApp,
        width: 50,
        textAlign: 'center',
    },
    cellSeparator: {
        fontSize: 14,
        color: '#ccc',
        marginHorizontal: 10,
    },
    cellName: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    CollabList: {
        flexDirection: 'column',
        height: '91%',
        width: '100%',
    }

})