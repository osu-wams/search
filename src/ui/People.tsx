import React, { useState } from 'react';
import { faIdCard, faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { Color, theme } from '../theme';
import Icon from './Icon';
import Card from './Card';

const PeopleCard = styled(Card)`
  padding: ${theme.spacing.unit * 2}px;
`;

const PeopleIcon = styled(Icon)`
  font-size: ${theme.fontSize[32]};
`;

const PeopleTitle = styled.h2`
  font-weight: 300;
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[18]};
  margin: 0;
`;

const PeopleLink = styled.a`
  color: ${Color['orange-400']};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-size: ${theme.fontSize[16]};
  font-weight: 300;
  & > svg {
    margin-left: ${theme.spacing.unit}px;
  }
`;

const PeopleEmptyState: React.FC = () => {
  return (
    <PeopleCard>
      <PeopleIcon icon={faIdCard} color={Color['neutral-400']} />
      <PeopleTitle>No people found.</PeopleTitle>
      <PeopleLink href="http://directory.oregonstate.edu">
        Search for people in the OSU directory
        <Icon icon={faLongArrowRight} color={Color['orange-400']} />
      </PeopleLink>
    </PeopleCard>
  );
};

const People: React.FC = () => {
  const [people, setPeople] = useState<any>([]);

  if (!people.length) {
    return <PeopleEmptyState />;
  }

  return (
    <PeopleCard>
      <PeopleTitle>People Results (there are some!)</PeopleTitle>
    </PeopleCard>
  );
};

export default People;
