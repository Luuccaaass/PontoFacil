import { StyleSheet } from "react-native";
import { DefaultAppColors } from "./DefaultColors";

export default StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: DefaultAppColors.color.cinzaApp,
    },
    
    boxHeaderUserInfo: {
        flexDirection:'row',
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width: '100%',
        height:200,
    },

    textInput: {    
        borderBottomColor: 'black',
        width:'90%',
        borderWidth:0,
        height:50,
        borderBottomWidth:2,
        padding:10,
        backgroundColor: DefaultAppColors.color.cinzaApp,
        marginBottom:20,
    },

    botao: {
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width:350,
        height:65,
        borderRadius:20,
        justifyContent: 'center',
        textAlign: 'right',
        borderBlockColor:'black',
        marginTop:30,
    },

    botaoLink: {
        marginTop: 20,
    },

    textLink:{
        textAlign: 'center',
        justifyContent: 'center',
        color: 'black'
    },

    textoBotao: {
        color: 'black',
        fontSize:20,
        textAlign:'center',
    },

    headerTitleText:{
        fontSize:32,
        padding:15,
        fontWeight: 'bold',
    },

        headerInfoContent:{
        flexDirection:'row',
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width: '100%',
        height:200,
        alignItems: 'flex-end',
    },
    
})