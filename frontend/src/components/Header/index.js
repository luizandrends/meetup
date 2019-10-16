import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

import logo from '../../assets/logo.svg';
import DefaultAvatar from '../../assets/default-avatar.png';

import Notifications from '../Notifications';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <Notifications />
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={profile.avatar ? profile.avatar.url : DefaultAvatar}
              alt="profile"
            />
          </Profile>
          <button type="submit" onClick={handleSignOut}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}
