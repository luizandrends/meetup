import React, { useEffect, useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Alert } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';

import Background from '../../components/Background';
import Meetup from '../../components/Meetup';
import Header from '../../components/Header';

import { Container, SelectDateContainer, SelectedDate, List } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: { date },
      });

      setMeetups(response.data);
    }

    loadMeetups();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubscription(id) {
    try {
      await api.post(`/subscriptions/${id}`);
    } catch (err) {
      Alert.alert('Erro!', 'Erro ao realizar Inscrição!');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <SelectDateContainer>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </SelectDateContainer>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Meetup
              handle={() => {
                handleSubscription(item.id);
              }}
              data={item}
              type="meetups"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
