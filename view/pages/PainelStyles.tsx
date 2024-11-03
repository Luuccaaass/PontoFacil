import { StyleSheet } from "react-native";

const laranjaApp = "#FF6800";
const cinzaApp = "#B9B9B9";
const verdeApp = "#6C64C8";


export default StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: cinzaApp,
        height: '100%',
        width:'100%',
    },

    boxDadosFunc: {
        flexDirection:'row',
        backgroundColor: laranjaApp,
        width: '100%',
        height:200,
        alignItems:'center',
        justifyContent:'flex-start',
        padding:30,
    },

    iconeFuncionario:{
        height: 100,
        width: 100,
        borderColor:'black',
        borderWidth:3,
        borderRadius:50,

    },

    boxInformacoes:{
        textAlign:'center',
        justifyContent:'flex-start',
        width:'100%',
        height:'100%',
        paddingLeft:20,
        marginTop:70,
    },

})