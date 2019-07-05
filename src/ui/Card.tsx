import styled from 'styled-components';
import { Color, shadows, theme } from '../theme';

const Card = styled.div`
  border-radius: ${theme.borderRadius};
  box-shadow: ${shadows[1]};
  background-color: ${Color.white};
  overflow: hidden;
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

export default Card;
