import { StyleSheet } from 'react-native';
import { DefaultAppColors } from './DefaultColors';


export default StyleSheet.create({
    CellId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: DefaultAppColors.color.laranjaApp,
        width: '8%',
        textAlign: 'center',
    },
    CellSeparator: {
        fontSize: 14,
        color: DefaultAppColors.color.defaultGray,
        marginHorizontal: 10,
    },
    CellName: {
        fontSize: 16,
        color: DefaultAppColors.color.defaultBlack,
        flex: 1,
    },
    Row: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    EmployeeList: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },

    CheckPointList: {
        flexDirection: 'column',
        height: '80%',
        width: '100%',
    },
})