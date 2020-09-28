import React, {useCallback, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {Image, ScrollView, TextInput, Alert} from 'react-native';

import * as Yup from 'yup';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);


  const handleSignUp = useCallback(async (data: SignUpFormData) => {

    try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
            email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'no minimo 6 dígitos'),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert('Cadastro realizado com sucesso!!');

        navigation.goBack();

    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

        } else {
            Alert.alert('erro ao fazer cadastro');
        }
    }

}, [navigation]);


  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={ {flex: 1}}
      >
      <Container>
        <Image source={logoImg} />

          <Title>Criar uma conta</Title>

          <Form ref={formRef} onSubmit={handleSignUp} style={{width:'100%'}}>

            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                  emailInputRef.current?.focus();
              }}

              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}

              />
              <Button
               onPress={() => {
                formRef.current?.submitForm();
            }}
              >
                Entrar
              </Button>
            </Form>


      </Container>
    </ScrollView>

    <BackToSignIn onPress= { () => navigation.goBack()}>
      <Icon name="arrow-left" size={20} color="#fff" />
      <BackToSignInText>Voltar para login</BackToSignInText>
    </BackToSignIn>
    </>
  );
};

export default SignUp;
