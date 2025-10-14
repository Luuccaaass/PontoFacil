import { StyleSheet } from 'react-native';
import { DefaultAppColors } from './DefaultColors';

export default StyleSheet.create({
    Container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: DefaultAppColors.color.cinzaApp,
        paddingHorizontal: '5%',
        paddingVertical: '2%',
    },

    TextInput: {    
        borderBottomColor: DefaultAppColors.color.defaultBlack,
        width:'100%',
        borderWidth:0,
        height:50,
        borderBottomWidth:2,
        padding:10,
        backgroundColor: DefaultAppColors.color.cinzaApp,
        marginBottom:20,
    },

    Button: {
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width:'100%',
        height:65,
        borderRadius:20,
        justifyContent: 'center',
        borderBlockColor: DefaultAppColors.color.defaultBlack,
        marginTop:30,
    },

    LinkButton: {
        marginTop: 20,
    },

    TextLink:{
        textAlign: 'center',
        justifyContent: 'center',
        color: DefaultAppColors.color.defaultBlack,
    },

    ButtonText: {
        color: DefaultAppColors.color.defaultBlack,
        fontSize:20,
        textAlign:'center',
    },

    HeaderTitleText:{
        fontSize:32,
        padding:15,
        fontWeight: 'bold',
    },


    HeaderLabel:{
        flexDirection:'row',
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width: '100%',
        height: '12%',
        alignItems: 'flex-end',
    },

    ScreenView: {
        flex: 1,
        height:'100%',
        width: '100%'
    },
});