import styled from 'styled-components';
import { Color, shadows, theme } from '../theme';

export const Card = styled.div`
  border-radius: ${theme.borderRadius};
  box-shadow: ${shadows[1]};
  background-color: ${Color.white};
  overflow: hidden;
`;

export const CardSplit = styled.hr`
  position: relative;
  left: -${theme.spacing.unit * 2}px;
  width: calc(100% + 32px); /* Need to hardcode 32 because it's inside calc */
  margin: 0;
  margin-top: ${theme.spacing.unit * 2}px;
  height: 0;
  border: 1px solid ${Color['neutral-300']};
`;
