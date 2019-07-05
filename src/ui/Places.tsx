import React, { useState } from 'react';
import { faSearchLocation, faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { Color, theme } from '../theme';
import Icon from './Icon';
import Card from './Card';

const PlacesCard = styled(Card)`
  padding: ${theme.spacing.unit * 2}px;
`;

const PlacesIcon = styled(Icon)`
  font-size: ${theme.fontSize[32]};
`;

const PlacesTitle = styled.h2`
  font-weight: 300;
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[18]};
  margin: 0;
`;

const PlacesLink = styled.a`
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

const PlacesEmptyState: React.FC = () => {
  return (
    <PlacesCard>
      <PlacesIcon icon={faSearchLocation} color={Color['neutral-400']} />
      <PlacesTitle>No places found.</PlacesTitle>
      <PlacesLink href="https://map.oregonstate.edu">
        Find buildings, parking and more on the campus map
        <Icon icon={faLongArrowRight} color={Color['orange-400']} />
      </PlacesLink>
    </PlacesCard>
  );
};

const Places: React.FC = () => {
  const [places, setPlaces] = useState<any>([]);

  if (!places.length) {
    return <PlacesEmptyState />;
  }

  return (
    <PlacesCard>
      <PlacesTitle>Places Results (there are some!)</PlacesTitle>
    </PlacesCard>
  );
};

export default Places;
