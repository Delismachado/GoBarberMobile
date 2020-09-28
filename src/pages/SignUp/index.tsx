import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={ {flex: 1}}
      >
      <Container>
        <Image source={logoImg} />

          <Title>Criar uma conta</Title>

          <Input
            name="name"
            icon="user"
            placeholder="Name"

            />
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


      </Container>
    </ScrollView>

    <BackToSignIn onPress= { () => navigation.navigate('SignIn')}>
      <Icon name="arrow-left" size={20} color="#fff" />
      <BackToSignInText>Voltar para login</BackToSignInText>
    </BackToSignIn>
    </>
  );
};

export default SignUp;
