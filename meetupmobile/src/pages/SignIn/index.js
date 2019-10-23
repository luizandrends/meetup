import React, { useRef } from 'react';
import { Image, Text } from 'react-native';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

import logo from '../../assets/logo.png';

import Background from '../../components/Background';

export default function SignIn({ navigation }) {
  const passwordRef = useRef();

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-adress"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
          />

          <SubmitButton onPress={() => {}}>
            <Text>Acessar</Text>
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar Conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
