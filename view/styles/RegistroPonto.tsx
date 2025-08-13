import { StyleSheet } from "react-native"

export default StyleSheet.create({
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
  width: '80%',
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
},
modalText: {
  fontSize: 18,
  marginBottom: 10,
},
qrData: {
  fontSize: 16,
  color: '#333',
  marginBottom: 20,
},
modalButton: {
  backgroundColor: '#0066cc',
  padding: 10,
  borderRadius: 5,
  alignSelf: 'center',
},


})