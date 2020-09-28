import React from 'react';
import {Image, View} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import { Container, Title, ForgotPassword, ForgotPasswordText } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

        <Title>Faça seu login</Title>
          <Input
          name="E-mail"
          icon="mail"
          placeholder="E-mail"

          />
          <Input
            name="password"
            icon="lock"
            placeholder="Senha"
          />
          <Button
            onPress={() => {
              console.log("Foi")
            }}
          >
            Entrar
          </Button>

          <ForgotPassword
            onPress={() => {
              console.log('Foi');
            }}
          >
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>


    </Container>
  );
};

export default SignIn;
