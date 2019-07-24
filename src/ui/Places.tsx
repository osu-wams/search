import React, { useState, useEffect } from 'react';
import { faLongArrowRight, faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import request from 'request-promise';
import { Color, theme } from '../theme';
import Icon from './Icon';
import { Card, CardTitle, CardContent, CardFooter } from './Card';
import default_image from '../assets/images/default_place.png';

const PlacesIcon = styled(Icon)`
  font-size: ${theme.fontSize[32]};
  margin-right: ${theme.spacing.unit}px;
`;

const PlacesList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: ${Color['neutral-700']};
  font-size: ${theme.fontSize[16]};
  font-weight: 300;
`;

const Place = styled.li`
  padding: 0;
  padding-top: ${theme.spacing.unit * 2}px;
  display: flex;
  align-items: center;
`;

const PlacesStatus = styled.p`
  color: ${Color['neutral-700']};
  font-size: ${theme.fontSize[16]};
  font-weight: 300;
  margin: 0;
  padding-top: ${theme.spacing.unit * 2}px;
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
    <Card>
      <CardTitle>
        <PlacesIcon icon={faMapMarkerAlt} color={Color['neutral-400']} />
        Places
      </CardTitle>
      <CardContent>
        <PlacesStatus>No places found.</PlacesStatus>
      </CardContent>
      <CardFooter>
        <PlacesLink href="https://map.oregonstate.edu">
          Find buildings, parking and more on the campus map
          <Icon icon={faLongArrowRight} color={Color['orange-400']} />
        </PlacesLink>
      </CardFooter>
    </Card>
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
    <Card>
      <CardTitle>
        <PlacesIcon icon={faMapMarkerAlt} color={Color['neutral-400']} />
        Places
      </CardTitle>
      <CardContent>
        <PlacesList>
          {places.map(place => {
            return (
              <Place key={place.id}>
                <PlaceImage src={place.image === null ? default_image : place.image} />
                <PlaceLink href={place.link}>{place.name}</PlaceLink>
              </Place>
            );
          })}
        </PlacesList>
      </CardContent>
      <CardFooter>
        <PlacesLink href="https://map.oregonstate.edu">
          Campus Map
          <Icon icon={faLongArrowRight} color={Color['orange-400']} />
        </PlacesLink>
      </CardFooter>
    </Card>
  );
};

export default Places;
