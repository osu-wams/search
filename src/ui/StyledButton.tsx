import styled from 'styled-components';
import { Color, breakpoints, theme } from '../theme';

const StyledButton = styled.button`
  background-color: ${Color['orange-400']};
  color: ${Color.white};
  text-decoration: none;
  border: 0;
  border-radius: ${theme.borderRadius};
  font-size: ${theme.fontSize[18]};
  font-weight: 300;
  padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
  margin-top: ${theme.spacing.unit * 2}px;
  cursor: pointer;
  &:active, &:focus, &:hover {
    background-color: ${Color["neutral-550"]};
  }
  & > svg {
    margin-left: ${theme.spacing.unit * 2}px;
  }
  @media screen and (min-width: ${breakpoints[768]}) {
    margin-top: ${theme.spacing.unit * 4}px;
  }
`;

export default StyledButton;
