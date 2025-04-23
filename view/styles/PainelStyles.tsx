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
        padding:20,
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


    boxPontosView:{
        backgroundColor:cinzaApp,
        height:'100%',
        width:'100%',
        padding:20,
    },


    boxPonto:{

        height:80,
        width:'100%',
        borderBottomColor:'black',
        borderBottomWidth:2,
    },

    linhaPontos:{
        flexDirection:'row',
        height:'70%',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
    },

    preenchimentoHorarioPonto:{
        height:'80%',
        width:'20%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:laranjaApp,
        borderRadius:8,
    },
})