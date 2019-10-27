import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Meetup from '../../components/Meetup';
import Background from '../../components/Background';
import Header from '../../components/Header';

import { Container, List } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        const response = await api.get('subscriptions');
        setSubscriptions(response.data);
      } catch (err) {
        Alert.alert('Erro!', 'Erro ao carregar as Inscrições!');
      }
    }
    loadSubscriptions();
  }, []);

  async function handleCancel(id) {
    try {
      await api.delete(`/subscriptions/${id}`);

      setSubscriptions(subscriptions.filter(s => s.id !== id));
    } catch (err) {
      Alert.alert('Erro!', 'Erro ao cancelar Inscrição');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Meetup
              handle={() => {
                handleCancel(item.id);
              }}
              data={item.meetup}
              type="subscriptions"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
