
import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import { Text, TouchableHighlight, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../globals/types';
import { authRegisterUserAction } from '../../redux/actions/auth/authRegisterUserAction';
import { AuthRegisterInputModel } from '../../redux/actions/auth/types/AuthRegister';

export default function RegisterScreen(props: RootStackScreenProps<"Register">) {
    const dispatch = useDispatch();
    const [registrationData, setRegistrationData] = React.useState<AuthRegisterInputModel>({Email: "",FirstName:"",LastName:"",Password:"",PhoneNumber:""});
    
    const register = () => {
        dispatch(authRegisterUserAction(registrationData))
    }

    return (
    <View style={styles.container}>
        <Text>First Name</Text>
        <TextInput
            style={styles.inputField}
            placeholder="First name"
            value={registrationData.FirstName}
            onChangeText={(firstName) => setRegistrationData({...registrationData,FirstName:firstName})}
        />
        <Text>Last Name</Text>
        <TextInput
            style={styles.inputField}
            placeholder="Last name"
            value={registrationData.LastName}
            onChangeText={(lastName) => setRegistrationData({...registrationData,LastName:lastName})}
        />
        <Text>Email</Text>
        <TextInput
            style={styles.inputField}
            placeholder="Email"
            value={registrationData.Email}
            onChangeText={(email) => setRegistrationData({...registrationData,Email:email})}
        />
        <Text>Password</Text>
        <TextInput
            style={styles.inputField}
            placeholder="Password"
            value={registrationData.Password}
            onChangeText={(password) => setRegistrationData({...registrationData,Password:password})}
            secureTextEntry
          />
        <Text>Phone Number</Text>
        <TextInput
            style={styles.inputField}
            placeholder="Phone Number"
            value={registrationData.PhoneNumber}
            onChangeText={(phoneNumber) => setRegistrationData({...registrationData,PhoneNumber:phoneNumber})}
            textContentType='telephoneNumber' 
            dataDetectorTypes='phoneNumber' 
            keyboardType='phone-pad' 
            maxLength={14}
        />
        <TouchableHighlight style={styles.button} onPress={register} underlayColor='#99d9f4'>
            <Text style={styles.buttonText} lightColor="#ffff" >Register</Text>
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding:20,
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
    }
});
