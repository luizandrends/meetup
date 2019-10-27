import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Input, Textarea, Form } from '@rocketseat/unform';
import { Container } from './styles';

import BannerInput from '../BannerInput';
import DateTimePicker from '../../../components/DateTimePicker';

import api from '../../../services/api';
import history from '../../../services/history';

export default function EditMeetup({ match }) {
  const { id } = match.params;

  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`meetups/${id}`);

      setMeetup(response.data);
    }

    getMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`meetups/${id}`, data);
      history.push('/dashboard');
      toast.success('Meetup alterado com sucesso');
    } catch (err) {
      toast.error('Nao foi possivel alterar seu meetup, verifique seus dados');
    }
  }

  return (
    <Container>
      <Form initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <hr />
        <Input name="title" type="text" placeholder="Novo titulo do meetup" />
        <Textarea name="description" type="text" placeholder="Nova descricao" />
        <DateTimePicker name="date" placeholder="Nova data" />
        <Input name="location" placeholder="Nova localizacao" />
        <button type="submit">
          <MdAddCircleOutline />
          <strong>Atualizar</strong>
        </button>
      </Form>
    </Container>
  );
}

EditMeetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
