import { StyleSheet } from 'react-native';

export const ButtonStyle = StyleSheet.create({
  imageBg: {
    height: 320,
    width: 220,
    backgroundColor: COLORS.violet,
    marginTop: 70,
    marginHorizontal: 20,
    borderRadius: 40,
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  btn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  container: {
    flex: 1, 
    backgroundColor: COLORS.violet
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  text: {
    color: 'grey',
    marginTop:5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  start: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});
