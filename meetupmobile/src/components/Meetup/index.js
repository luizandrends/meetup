import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Banner,
  Content,
  Title,
  TimeContent,
  Time,
  LocationContent,
  Location,
  OrganizerContent,
  Organizer,
  SubscriptionButton,
} from './styles';

export default function Meetup({ data, handle, type }) {
  const dateFormatted = useMemo(
    () =>
      format(parseISO(data.date), "dd 'de' MMMM', às' HH'h'", { locale: pt }),
    [data.date]
  );

  return (
    <Container>
      <Banner source={{ uri: data.file && data.file.url }} />
      <Content>
        <Title>{data.title}</Title>
        <TimeContent>
          <Icon name="event" size={14} color="rgba(0, 0, 0, 0.4)" />
          <Time>{dateFormatted}</Time>
        </TimeContent>
        <LocationContent>
          <Icon name="room" size={14} color="rgba(0, 0, 0, 0.4)" />
          <Location>{data.location}</Location>
        </LocationContent>
        <OrganizerContent>
          <Icon name="person" size={14} color="rgba(0, 0, 0, 0.4)" />
          <Organizer>{data.user.name}</Organizer>
        </OrganizerContent>
        {!data.past && (
          <SubscriptionButton onPress={handle}>
            {type === 'meetups' ? 'Realizar Inscrição' : 'Cancelar Inscrição'}
          </SubscriptionButton>
        )}
      </Content>
    </Container>
  );
}
