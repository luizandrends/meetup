import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 62px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 900px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > strong {
      font-size: 32px;
      color: #fff;
    }

    div {
      display: flex;
      flex-direction: row;

      button.edit {
        margin-right: 10px;
        height: 40px;
        padding: 0 25px;
        background: #3b9eff;
        border: 0;
        border-radius: 4px;

        display: flex;
        flex-direction: row;
        align-items: center;

        transition: background 0.2s;

        strong {
          color: #fff;
          margin-left: 10px;
        }

        &:hover {
          background: ${darken(0.03, '#3b9eff')};
        }
      }

      button.delete {
        margin-right: 5px;
        height: 40px;
        padding: 0 25px;
        background: #f64c75;
        border: 0;
        border-radius: 4px;

        display: flex;
        flex-direction: row;
        align-items: center;

        transition: background 0.2s;

        strong {
          color: #fff;
          margin-left: 10px;
        }

        &:hover {
          background: ${darken(0.06, '#f64c75')};
        }
      }
    }
  }

  img {
    margin-top: 50px;
    width: 900px;
    height: 300px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const Info = styled.div`
  margin-top: 50px;
  width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;

    p {
      width: 900px;
      font-size: 20px;
      font-weight: lighter;
      color: #fff;
    }

    span {
      margin-top: 50px;
      font-size: 18px;
      font-weight: lighter;
      color: #fff;
    }

    > div {
      margin-top: 50px;

      div {
        margin-right: 25px;
        color: #666;
        align-items: center;

        small {
          font-size: 16px;
          margin-left: 5px;
        }
      }
    }
  }
`;
