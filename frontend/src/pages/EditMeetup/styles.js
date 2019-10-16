import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;

    margin-top: 32px;
    width: 900px;

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin-bottom: 20px;
    }

    input {
      margin: 0 0 10px;
      height: 44px;
      padding: 0 12px;
      border: 0;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    textarea {
      margin: 0 0 10px;
      height: 120px;
      border: 0;
      border-radius: 4px;
      padding: 5px 12px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;

      &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: lighter;
      }
    }

    button {
      width: 20%;
      border: 0;
      height: 40px;
      background: #f64c75;
      color: #fff;
      border-radius: 4px;
      margin-top: 5px;
      transition: background 0.3s;

      display: flex;
      justify-content: center;
      align-self: flex-end;

      &:hover {
        background: ${darken(0.06, '#f64c75')};
      }

      strong {
        margin-left: 10px;
        padding-left: 10px;
        border-left: 1px solid #fff;
      }
    }
  }
`;
