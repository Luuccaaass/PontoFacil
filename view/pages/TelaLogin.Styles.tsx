import { StyleSheet } from "react-native";

const laranjaApp = "#FF6800";
const cinzaApp = "#B9B9B9";
const verdeApp = "#6C64C8";

export default StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: cinzaApp,
        padding:20,
    },


    textInput: {    
        borderBottomColor: 'black',
        width:350,
        borderWidth:0,
        height:50,
        borderBottomWidth:2,
        padding:10,
        backgroundColor:cinzaApp,
        marginBottom:20,
    },

    iconeAplicativo: {
        height:200,
        width:200,
    },

    textoTitulo: {
        fontSize:40,
        marginBottom:20,
        marginTop:80,
    },


    botao: {
        backgroundColor:laranjaApp,
        width:350,
        height:65,
        borderRadius:20,
        justifyContent: 'center',
        textAlign: 'right',
        borderBlockColor:'black',
        marginTop:30,




    },

    textoBotao: {
        color: 'black',
        fontSize:20,
        textAlign:'center',
    },

    botaoLink: {
        marginTop: 20,

    },

    textLink:{
        textAlign: 'center',
        justifyContent: 'center',
        color: 'black'
    }


})