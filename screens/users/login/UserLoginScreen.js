import React from 'react'
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import {useIsFocused} from '@react-navigation/native'
import store from '../../../store/store'
import {login} from '../../../store/actions/userActions'

class UserLoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        validationSuccess: false
    };
    componentDidMount() {
        //console.log(this.props.route);
        //console.log(typeof this.props.route.params.email)
        if(typeof this.props.route.params === 'undefined'){
            return 
        }
        //console.log(this.props.route.params.email)
        const email = this.props.route.params.email;
        const password = this.props.route.params.password;
        this.setState({email, password})
        //console.log(this.state)
    }

    submitLogin = ()=> {
        const email = this.state.email;
        const password = this.state.password;
        const payload = {
            email,
            password
        }
        store.dispatch(login(payload))
    };

    validate = ()=> {
        return (this.state.email.includes('@') && this.state.password.length>=6)
    };

    toSignUp = () => {
        this.props.navigation.navigate('SignUp', {email: this.state.email})
    };

    render(){
        console.log(this.state)
        return (<View>
                <Text> Login </Text>
                <TextInput 
                    placeholder="Username" 
                    onChangeText={email => this.setState({email})}
                    defaultValue={this.state.email}
                    />
                <TextInput 
                    placeholder="Password" 
                    secureTextEntry={true} 
                    onChangeText={password => this.setState({password})}
                    defaultValue={this.state.password}
                    />
                <Button 
                    title="Đăng nhập" 
                    onPress={this.submitLogin}
                    disabled={!this.validate()}
                />
                <View>
                    <View>
                        <Text>Chưa có tài khoản?</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={this.toSignUp}
                        >
                            <Text style={{color: 'blue'}}> Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            )
    } 
}

export default UserLoginScreen