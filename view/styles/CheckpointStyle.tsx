import { StyleSheet } from "react-native";
import { DefaultAppColors } from "./DefaultColors";


export const CheckpointStyle = StyleSheet.create ({
    MapPreview: {
        height: '50%', 
        width: '90%', 
        backgroundColor:'blue', 
        marginTop:20,
        borderRadius: 20,
        borderWidth:4,
        borderColor: DefaultAppColors.color.defaultBlack,
    },

    chekcpointInfoContainer: {
        width: '90%',
        height: 50,
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    checkPointinfo: {
        width: '40%',
        height: '100%',
        borderBottomColor: DefaultAppColors.color.defaultBlack,
        borderBottomWidth: 2,
    },

    getCurrentCoordsButton: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        textAlign: 'center',

    },

    getCurrentLocationIconButton:{
        height: 50,
        width: 50,
    },

});