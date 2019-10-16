import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';

import { Input, Textarea, Form } from '@rocketseat/unform';
import { Container } from './styles';

import { createMeetupRequest } from '../../store/modules/meetup/actions';

import BannerInput from './BannerInput';
import DateTimePicker from '../../components/DateTimePicker';

const schema = Yup.object().shape({
  file_id: Yup.number().required('Banner Obrigatorio'),
  title: Yup.string().required('Titulo Obrigatorio'),
  description: Yup.string()
    .required('Descricao obrigatoria')
    .max(200, 'A descricao pode ter somente 200 caracteres'),
  date: Yup.date().required('Data obrigatoria'),
  location: Yup.string().required('Loacalizacao obrigatoria'),
});

export default function NewMeetup() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.meetup.loading);

  function handleSubmit(data) {
    dispatch(createMeetupRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <BannerInput name="file_id" />
        <hr />
        <Input name="title" type="text" placeholder="Titulo do meetup" />
        <Textarea
          name="description"
          type="text"
          placeholder="Descricao completa"
        />
        <DateTimePicker name="date" placeholder="Data do Meetup" />
        <Input name="location" placeholder="Localizacao" />
        <button type="submit">
          <MdAddCircleOutline />
          <strong>{loading ? 'Carregando...' : 'Cadastrar'}</strong>
        </button>
      </Form>
    </Container>
  );
}
