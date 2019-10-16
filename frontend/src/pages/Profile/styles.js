import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    margin-top: 30px;

    display: flex;
    justify-content: center;
    flex-direction: column;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin-bottom: 10px;
    }
  }

  button {
    width: 20%;
    height: 40px;
    border: 0;
    border-radius: 4px;
    background: #f64c75;
    transition: background 0.3s;

    display: flex;
    justify-content: center;
    align-self: flex-end;

    &:hover {
      background: ${darken(0.06, '#f64c75')};
    }

    strong {
      color: #fff;
      font-size: 16px;
      margin-left: 5px;
      padding-left: 5px;
      border-left: 1px solid #fff;
    }
  }
`;
