import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { createMeetupSuccess, createMeetupFailure } from './actions';

export function* createMeetup({ payload }) {
  try {
    const { file_id, title, description, location, date } = payload.data;

    const meetup = { file_id, title, description, location, date };

    const response = yield call(api.post, 'meetups', meetup);

    yield put(createMeetupSuccess(response.data));
    toast.success('Meetup criado com sucesso');
    history.push('/dashboard');
  } catch (err) {
    yield put(createMeetupFailure());
    toast.error('Nao foi possivel criar seu meetup');
  }
}
export default all([takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup)]);
