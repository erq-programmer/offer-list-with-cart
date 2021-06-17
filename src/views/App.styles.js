import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

export const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Wrapper = styled.div`
  margin: 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;

export const StyledList = styled(List)`
  padding: 0 !important;
  li:last-child {
    display: none;
  }
`;

export const CategorySection = styled.section`
  margin-bottom: 20px;
`;

export const CategoryText = styled.header`
  margin-bottom: 10px;
`;
