import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdEdit, MdDeleteForever, MdToday, MdLocationOn } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Container, Info } from './styles';

import banner from '../../../assets/default-banner.png';

import history from '../../../services/history';
import api from '../../../services/api';

export default function DetailMeetup({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`meetups/${id}`);

      const { title, description, date, location, file } = response.data;

      const data = {
        id,
        title,
        description,
        date: format(parseISO(date), "dd 'de' MMMM', às 'HH'h'", {
          locale: pt,
        }),
        location,
        file,
      };
      setMeetup(data);
    }
    getMeetup();
  }, [id]);

  async function handleDelete() {
    try {
      await api.delete(`meetups/${id}`);
      toast.success('Seu meetup foi deletado com sucesso');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Nao foi possivel cancelar o seu meetup');
    }
  }

  function handleRoute() {
    history.push(`/edit/${id}`);
  }

  return (
    <Container>
      <div>
        <strong>{meetup.title}</strong>
        <div>
          <button type="submit" className="edit" onClick={handleRoute}>
            <MdEdit color="#fff" size={20} />
            <strong>Editar</strong>
          </button>
          <button type="submit" className="delete" onClick={handleDelete}>
            <MdDeleteForever color="#fff" size={20} />
            <strong>Cancelar</strong>
          </button>
        </div>
      </div>
      <img src={banner} alt="banner" />
      <Info>
        <div className="wrapper">
          <p>{meetup.description}</p>
          <span>
            Caso queira participar como palestrante do meetup envie um e-mail
            para organizacao@meetuprn.com.br.
          </span>
          <div>
            <div>
              <MdToday color="#666" size={20} />
              <small>{meetup.date}</small>
            </div>
            <div>
              <MdLocationOn color="#666" size={20} />
              <small>{meetup.location}</small>
            </div>
          </div>
        </div>
      </Info>
    </Container>
  );
}

DetailMeetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
