import styled from 'styled-components';
import { Color, shadows, theme } from '../theme';

export const Card = styled.div`
  border-radius: ${theme.borderRadius};
  box-shadow: ${shadows[1]};
  background-color: ${Color.white};
  overflow: hidden;
`;

export const CardTitle = styled.div`
  padding: ${theme.spacing.unit * 2}px;
  font-weight: 300;
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[18]};
  margin: 0;
  border-bottom: 2px solid ${Color['neutral-300']};
`;

export const CardContent = styled.div`
  padding: 0 ${theme.spacing.unit * 2}px;
`;

export const CardFooter = styled.div`
  padding: ${theme.spacing.unit * 2}px;
`;
