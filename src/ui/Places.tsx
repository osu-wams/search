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
  font-size: ${theme.fontSize[16]};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PlaceSkelLink = styled(PlaceLink)`
  @keyframes place-waiting {
    from {
      background-color: ${Color['neutral-100']};
    }
    to {
      background-color: ${Color['neutral-200']};
    }
  }
  background-color: ${Color['neutral-100']};
  height: ${theme.fontSize[16]};
  width: 60%;
  margin: 4px 0;
  animation: place-waiting 900ms 300ms infinite alternate;
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

const PlaceSkelImage = styled(PlaceImage).attrs({ as: 'div' })`
  @keyframes place-waiting {
    from {
      background-color: ${Color['neutral-100']};
    }
    to {
      background-color: ${Color['neutral-200']};
    }
  }
  background-color: ${Color['neutral-100']};
  animation: place-waiting 900ms 300ms infinite alternate;
`;

const PlacesTotal = styled.p`
  margin: 0;
  margin-top: ${theme.spacing.unit * 2 + 2}px;
  padding: 0;
  font-size: ${theme.fontSize[14]};
  color: ${Color['neutral-550']};
  font-style: italic;
  font-weight: 300;
`;

const PlacesTitle: React.FC = () => {
  return (
    <CardTitle>
      <PlacesIcon icon={faMapMarkerAlt} color={Color['neutral-400']} />
      Places
    </CardTitle>
  );
};

const PlacesFooter = () => {
  return (
    <CardFooter>
      <PlacesLink href="https://map.oregonstate.edu">
        Campus Map
        <Icon icon={faLongArrowRight} color={Color['orange-400']} />
      </PlacesLink>
    </CardFooter>
  );
};

const PlacesEmptyState: React.FC = () => {
  return (
    <Card>
      <PlacesTitle />
      <CardContent>
        <PlacesStatus>No places found.</PlacesStatus>
      </CardContent>
      <PlacesFooter />
    </Card>
  );
};

const PlacesWaiting: React.FC = () => {
  return (
    <Card>
      <PlacesTitle />
      <CardContent>
        <PlacesList>
          <Place>
            <PlaceSkelImage />
            <PlaceSkelLink />
          </Place>
          <Place>
            <PlaceSkelImage />
            <PlaceSkelLink />
          </Place>
        </PlacesList>
      </CardContent>
    </Card>
  );
};

const Places = ({ query }: { query: String }) => {
  const [places, setPlaces] = useState<any>(null);

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

  if (places === null) {
    return <PlacesWaiting />;
  } else if (!places.length) {
    return <PlacesEmptyState />;
  }

  return (
    <Card>
      <PlacesTitle />
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
        <PlacesTotal>
          Showing {places.length < 5 ? places.length : 5} of {places.length}
        </PlacesTotal>
      </CardContent>
      <PlacesFooter />
    </Card>
  );
};

export default Places;
