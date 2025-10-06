import { StyleSheet } from "react-native";

const laranjaApp = "#FF6800";
const cinzaApp = "#B9B9B9";
const verdeApp = "#6C64C8";
const defaultBlack = "#000000"


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: cinzaApp,
        height: '100%',
        width: '100%',
    },

    boxDadosFunc: {
        flexDirection: 'row',
        backgroundColor: laranjaApp,
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },

    iconeFuncionario: {
        height: 100,
        width: 100,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 50,

    },

    boxInformacoes: {
        textAlign: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        marginTop: 70,
    },


    boxPontosView: {
        backgroundColor: cinzaApp,
        height: '15%',
        width: '100%',
        padding: 20,
    },


    boxPonto: {

        height: 80,
        width: '100%',
        borderBottomColor: 'black',
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
        backgroundColor: laranjaApp,
        borderRadius: 8,
    },

    boxTable: {
        height: '65%',

    },

    tableContainer: {
        flex: 1,
        backgroundColor: cinzaApp,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    diaContainer: {
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: defaultBlack,
        paddingBottom: 12,
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
        backgroundColor: laranjaApp,
        width: 50,
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 5,
        marginHorizontal: 2,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },

    horariosScrollView: {
        flexGrow: 0, // impede que o ScrollView cresça além do necessário
    },
    horariosContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height:40,
    },
    horarioItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    separador: {
        fontSize: 16,
        color: '#999',
        marginHorizontal: 4,
    },

})