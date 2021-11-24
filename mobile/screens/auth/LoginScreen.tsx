import * as React from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import { Text, TouchableHighlight, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../globals/types';
import { authLoginUserAction } from '../../redux/actions/auth/authLoginUserAction';
import { AuthLoginInputModel } from '../../redux/actions/auth/types/AuthLogin';

export default function AlertsScreen(props: RootStackScreenProps<"Root">) {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = React.useState<AuthLoginInputModel>({email: "",password:""});

  const signIn = () => {
      dispatch(authLoginUserAction(loginData))
  }
  
  const goToRegisterPage = () => props.navigation.navigate("Register");

  return (
    <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
            style={styles.inputField}
            placeholder="Email"
            value={loginData.email}
            onChangeText={(email) => setLoginData({...loginData,email:email})}
        />
        <Text>Password</Text>
        <TextInput
            style={styles.inputField}
            placeholder="Password"
            value={loginData.password}
            onChangeText={(password) => setLoginData({...loginData,password:password})}
            secureTextEntry
          />
       
        <TouchableHighlight style={styles.button} onPress={signIn} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}  lightColor="#ffff" >Login</Text>
      </TouchableHighlight>
      <View style={styles.secondaryTextBox}>
        <Text style={styles.secondaryText}>Don't have an acount?</Text>
        <Text style={styles.secondaryText} lightColor="#0487FF" onPress={goToRegisterPage}>Register now</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop:50,
        paddingBottom:50,
        paddingLeft:20,
        paddingRight:20,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height:'100%'
    },
    inputField: {
        padding: 10,
        marginTop:12,
        marginBottom:12,
        width: '100%',
        borderColor:"rgb(200,200,200)",
        borderWidth: 1,
        borderRadius: 4,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    buttonText: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight:'500'
    },
    button: {
        height: 45,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginVertical:40
    },
    secondaryTextBox: {
       padding:50,
        flex: 0,
        justifyContent: 'center',
        width: '100%',
        height:'100%'
    },
    secondaryText: {
      fontSize: 14,
      alignSelf: 'center',
    }
});
