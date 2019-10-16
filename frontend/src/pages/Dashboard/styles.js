import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 62px auto;

  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: 32px;
      color: #fff;
    }

    a {
      width: 20%;
      height: 40px;
      border: 0;
      border-radius: 4px;
      background: #f64c75;
      color: #fff;
      font-weight: bold;
      transition: background 0.3s;

      display: flex;
      justify-content: center;
      align-items: center;

      strong {
        margin-left: 7px;
        padding-left: 7px;
        border-left: 0.5px solid #fff;
      }

      &:hover {
        background: ${darken(0.06, '#f64c75')};
      }
    }
  }
`;

export const MeetupInformation = styled.ul`
  margin-top: 50px;

  li {
    padding: 22px 22px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin-top: 22px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 17px;
      color: #fff;
    }

    aside {
      display: flex;
      align-items: center;

      small {
        color: #666;
        font-size: 12px;
        margin-right: 12px;
        padding-right: 12px;
        border-right: 1px solid #f64c75;
      }

      a {
        border-radius: 4px;
        transition: background 0.3s;

        &:hover {
          background: #f64c75;
          border-radius: 4px;
        }
      }
    }
  }
`;
