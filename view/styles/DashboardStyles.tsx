import { StyleSheet } from 'react-native';
import { DefaultAppColors } from './DefaultColors';

export default StyleSheet.create({
    HeaderUserInfo: {
        flexDirection: 'row',
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: '5%',
        flexGrow:0,
        flexShrink: 0,
        overflow: 'hidden',
    },

    UserIcon: {
        height: 100,
        width: 100,
        borderColor: DefaultAppColors.color.defaultBlack,
        borderWidth: 3,
        borderRadius: 50,
    },

    InfoBox: {
        textAlign: 'center',
        justifyContent: 'flex-start',
        width: '55%',
        height: '80%',
        paddingLeft: '5%',
        marginTop: 50,
        flex: 0,
    },

    CheckInButtonContainer: {
        backgroundColor: DefaultAppColors.color.cinzaApp,
        height: '15%',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: '5%',
    },


    CheckpointLine: {
        flexDirection: 'row',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    CheckInTime: {
        height: '80%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DefaultAppColors.color.laranjaApp,
        borderRadius: 8,
    },

    TableBox: {
        height: '65%',
        flex:0,

    },

    TableContainer: {
        flex: 1,
        backgroundColor: DefaultAppColors.color.cinzaApp,
        overflow: 'hidden',
        width:'90%',
    },

    ScrollViewStyle: {
        flex: 1,
    },

    DayRowContainer: {
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: DefaultAppColors.color.defaultBlack,
        paddingBottom: 12,
        width:'100%',
        flex: 0,
        maxHeight: 80
    },

    DateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: DefaultAppColors.color.defaultBlack,
        marginBottom: 8,
    },

    horariosContainer: {
        marginLeft: 16,
        flexDirection: 'row',
    },

    checkInTimeText: {
        fontSize: 16,
        color: DefaultAppColors.color.defaultGray,
        paddingVertical: 2,
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width: 50,
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 5,
        marginHorizontal: 2,
        flex: 0,
    },

    EmptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },

    EmptyText: {
        fontSize: 16,
        color: DefaultAppColors.color.defaultBlack,
        textAlign: 'center',
    },

    TimesScrollView: {
        flexGrow: 0, 
        height: 40,
        maxHeight: 40,
    },

    CheckInTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height:40,
        width: '100%',
        flex: 0,
    },

    TimeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0,
    },

    Separator: {
        fontSize: 16,
        color: DefaultAppColors.color.defaultGray,
        marginHorizontal: 4,
    },

    EditButton:{
        height: '80%',
        width: '20%',
        marginTop: 50,
        alignItems: 'center',
    },

    ImageButton:{
        height: 42,
        width: 42,
        borderWidth: 2,
        borderColor: DefaultAppColors.color.defaultBlack,
        borderRadius: 10,
    }
});