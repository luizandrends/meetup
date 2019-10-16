import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';

import { Container, MeetupInformation } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('allmeetups');

      const data = response.data.map(meetup => {
        return {
          id: meetup.id,
          title: meetup.title,
          date: format(parseISO(meetup.date), "dd 'de' MMMM', às 'HH'h'", {
            locale: pt,
          }),
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);
  return (
    <Container>
      <div>
        <h3>Meus meetups</h3>
        <Link to="/new">
          <MdAddCircleOutline /> <strong>Novo Meetup</strong>
        </Link>
      </div>

      <MeetupInformation>
        {meetups.map(meetup => (
          <li key={meetup.id}>
            <strong>{meetup.title}</strong>
            <aside>
              <small>{meetup.date}</small>
              <Link to={`/detail/${meetup.id}`}>
                <MdKeyboardArrowRight color="#fff" size={22} />
              </Link>
            </aside>
          </li>
        ))}
      </MeetupInformation>
    </Container>
  );
}
