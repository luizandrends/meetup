import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 60px;
  background: #18161f;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #f64c75;
    }

    a {
      font-weight: bold;
      color: #fff;
    }
  }

  aside {
    display: flex;
    align-items: center;

    button {
      width: 60px;
      height: 35px;
      border: 0;
      border-radius: 4px;
      background: #f64c75;
      color: #fff;
      font-weight: bold;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.06, '#f64c75')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: solid 1px #f64c75;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 20px;
  }
`;
