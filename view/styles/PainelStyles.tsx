import { StyleSheet } from "react-native";
import { DefaultAppColors } from "./DefaultColors";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: DefaultAppColors.color.cinzaApp,
        height: '100%',
        width: '100%',
    },

    headerUserInfo: {
        flexDirection: 'row',
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        flexGrow:0,
        flexShrink: 0,
        overflow: 'hidden',
    },

    iconeFuncionario: {
        height: 100,
        width: 100,
        borderColor: DefaultAppColors.color.defaultBlack,
        borderWidth: 3,
        borderRadius: 50,
    },

    boxInformacoes: {
        textAlign: 'center',
        justifyContent: 'flex-start',
        width: '55%',
        height: '80%',
        paddingLeft: 20,
        marginTop: 50,
        flex: 0,
    },

    boxPontosView: {
        backgroundColor: DefaultAppColors.color.cinzaApp,
        height: '15%',
        width: '100%',
        padding: 20,
    },

    boxPonto: {
        height: 80,
        width: '100%',
        borderBottomColor: DefaultAppColors.color.defaultBlack,
        borderBottomWidth: 2,
    },

    linhaPontos: {
        flexDirection: 'row',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    preenchimentoHorarioPonto: {
        height: '80%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DefaultAppColors.color.laranjaApp,
        borderRadius: 8,
    },

    boxTable: {
        height: '65%',
        flex:0,

    },

    tableContainer: {
        flex: 1,
        backgroundColor: DefaultAppColors.color.cinzaApp,
        overflow: 'hidden',
    },


    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },

    diaContainer: {
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: DefaultAppColors.color.defaultBlack,
        paddingBottom: 12,
        width:'90%',
        flex: 0,
        maxHeight: 80
    },

    dataTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },

    horariosContainer: {
        marginLeft: 16,
        flexDirection: 'row',
    },

    horarioTexto: {
        fontSize: 16,
        color: '#666',
        paddingVertical: 2,
        backgroundColor: DefaultAppColors.color.laranjaApp,
        width: 50,
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 5,
        marginHorizontal: 2,
        flex: 0,
    },

    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },

    emptyText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },

    horariosScrollView: {
        flexGrow: 0, 
        height: 40,
        maxHeight: 40,
    },

    horariosContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height:40,
        width: '100%',
        flex: 0,
    },

    horarioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0,
    },

    separador: {
        fontSize: 16,
        color: '#999',
        marginHorizontal: 4,
    },

    editButton:{
        height: '80%',
        width: '20%',
        marginTop: 50,
        ///justifyContent: 'center',
        alignItems: 'center',
    },

    imageButton:{
        height: 42,
        width: 42,
        borderWidth: 2,
        borderColor: DefaultAppColors.color.defaultBlack,
        borderRadius: 10,
    }
});