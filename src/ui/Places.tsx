import React, { useState, useEffect } from 'react';
import {
  faSearchLocation,
  faLongArrowRight,
  faMapMarkerAlt
} from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import request from 'request-promise';
import { Color, theme } from '../theme';
import Icon from './Icon';
import { Card, CardSplit } from './Card';

const PlacesCard = styled(Card)`
  padding: ${theme.spacing.unit * 2}px;
`;

const PlacesIcon = styled(Icon)`
  font-size: ${theme.fontSize[32]};
  margin-right: ${theme.spacing.unit}px;
`;

const PlacesTitle = styled.h2`
  padding: 0;
  font-weight: 300;
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[18]};
  margin: 0;
`;

const PlacesList = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: ${theme.spacing.unit}px;
  padding: 0;
  padding-top: ${theme.spacing.unit}px;
  color: ${Color['neutral-700']};
  font-size: ${theme.fontSize[16]};
  font-weight: 300;
`;

const Place = styled.li`
  padding: ${theme.spacing.unit}px 0;
  display: flex;
  align-items: center;
`;

const PlaceLink = styled.a`
  color: ${Color.black};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PlacesLink = styled.a`
  padding: 0;
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

const PlaceImage = styled.img`
  height: ${theme.fontSize[32]};
  width: ${theme.fontSize[32]};
  object-fit: cover;
  border-radius: 50%;
  margin-right: ${theme.spacing.unit}px;
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

const Places = ({ query }: { query: String }) => {
  const [places, setPlaces] = useState<any>([]);

  useEffect(() => {
    request({
      method: 'GET',
      url: `https://p2u4k1c842.execute-api.us-west-2.amazonaws.com/prod/locations?q=${query}`,
      json: true
    })
      .then(data => {
        let cleanedData = data.filter(item => {
          if (item.link === null) {
            return false;
          }
          return true;
        });
        cleanedData = cleanedData
          .sort((a, b) => {
            let itemA = a.name.toUpperCase();
            let itemB = b.name.toUpperCase();
            if (itemA < itemB) {
              return -1;
            } else if (itemA > itemB) {
              return 1;
            }
            return 0;
          })
          .slice(0, 5);
        setPlaces(cleanedData);
      })
      .catch(err => {
        console.log(err);
      });
  }, [query]);

  if (!places.length) {
    return <PlacesEmptyState />;
  }

  return (
    <PlacesCard>
      <PlacesTitle>
        <PlacesIcon icon={faMapMarkerAlt} color={Color['neutral-400']} />
        Places
      </PlacesTitle>
      <CardSplit />
      <PlacesList>
        {places.map(place => {
          return (
            <Place key={place.id}>
              <PlaceImage src={place.image} />
              <PlaceLink href={place.link}>{place.name}</PlaceLink>
            </Place>
          );
        })}
      </PlacesList>
      <PlacesLink href="https://map.oregonstate.edu">
        Campus Map
        <Icon icon={faLongArrowRight} color={Color['orange-400']} />
      </PlacesLink>
    </PlacesCard>
  );
};

export default Places;
