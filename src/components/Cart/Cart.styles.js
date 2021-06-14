import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100vw;
  max-width: 500px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;
