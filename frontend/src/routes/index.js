import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NewMeetup from '../pages/New/NewMeetup';
import DetailMeetup from '../pages/New/DetailMeetup';
import EditMeetup from '../pages/New/EditMeetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/new" component={NewMeetup} isPrivate />
      <Route path="/detail/:id" component={DetailMeetup} isPrivate />
      <Route path="/edit/:id" component={EditMeetup} isPrivate />
    </Switch>
  );
}
