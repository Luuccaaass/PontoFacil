import { StyleSheet } from 'react-native';
import { DefaultAppColors } from './DefaultColors';


export default StyleSheet.create({
    AppIcon: {
        height:200,
        width:200,
    },

    LabelText: {
        fontSize:40,
        marginBottom:20,
        marginTop:80,
    },

    DropDownContainer: {    
        borderBottomColor: DefaultAppColors.color.defaultBlack,
        width: '100%',
        borderWidth:0,
        height:50,
        borderBottomWidth:2,
        backgroundColor:DefaultAppColors.color.cinzaApp,
        marginBottom:20,
        alignContent: 'center',
        justifyContent:'center',
        textAlign:'left'
    },
})