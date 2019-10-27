import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    height: 300px;
    width: 900px;
    border: 3px rgba(255, 255, 255, 0.3);
    background: #eee;

    div {
      height: 300px;
      width: 900px;
      background: #18161f;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      strong {
        color: #666;
        padding-bottom: 5px;
        font-size: 22px;
      }

      &:hover {
        opacity: 0.4;
      }
    }

    img {
      height: 300px;
      width: 900px;
      border-radius: 4px;
      object-fit: cover;
    }

    input {
      display: none;
    }
  }
`;
