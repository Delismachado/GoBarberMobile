import React, {useCallback, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, ScrollView, TextInput, Alert} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {useAuth} from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';


interface SignInFormData {
  email: string;
  password: string
}


const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const {signIn} = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail válido obrigatório")
                    .email("Digite um email válido"),
                password: Yup.string().required("Senha obrigatória"),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

            } else {
            Alert.alert(
                'erro na autenticação',
                'erro ao fazer login',
            )
            }
        }


    }, [signIn]);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={ {flex: 1}}
      >
      <Container>
        <Image source={logoImg} />

          <Title>Faça seu login</Title>
          <Form ref={formRef} onSubmit={handleSignIn} style={{width:'100%'}}>
              <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="E-mail"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"

              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                formRef.current?.submitForm();
            }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>


      </Container>
    </ScrollView>

    <CreateAccountButton onPress={ () => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
      </>
    );
};

export default SignIn;
