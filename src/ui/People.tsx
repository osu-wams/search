import React, { useState, useEffect } from 'react';
import { faLongArrowRight, faUserCircle } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import request from 'request-promise';
import { Color, theme } from '../theme';
import Icon from './Icon';
import { Card, CardTitle, CardContent, CardFooter } from './Card';

const PeopleIcon = styled(Icon)`
  font-size: ${theme.fontSize[32]};
  margin-right: ${theme.spacing.unit}px;
`;

const PersonName = styled.p`
  margin: 0;
`;

const PersonDept = styled.p`
  margin: 0;
  font-size: ${theme.fontSize[12]};
`;

const PeopleList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: ${Color['neutral-700']};
  font-size: ${theme.fontSize[16]};
  font-weight: 300;
`;

const Person = styled.li`
  padding: 0;
  padding-top: ${theme.spacing.unit * 2}px;
`;

const PeopleStatus = styled.p`
  color: ${Color['neutral-700']};
  font-size: ${theme.fontSize[16]};
  font-weight: 300;
  margin: 0;
  padding-top: ${theme.spacing.unit * 2}px;
`;

const PersonLink = styled.a`
  color: ${Color.black};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PeopleLink = styled.a`
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

const PeopleEmptyState: React.FC = () => {
  return (
    <Card>
      <CardTitle>
        <PeopleIcon icon={faUserCircle} color={Color['neutral-400']} />
        People
      </CardTitle>
      <CardContent>
        <PeopleStatus>No people found.</PeopleStatus>
      </CardContent>
      <CardFooter>
        <PeopleLink href="http://directory.oregonstate.edu">
          Search for people in the OSU directory
          <Icon icon={faLongArrowRight} color={Color['orange-400']} />
        </PeopleLink>
      </CardFooter>
    </Card>
  );
};

const People = ({ query }: { query: String }) => {
  const [people, setPeople] = useState<any>([]);

  useEffect(() => {
    request({
      method: 'GET',
      url: `https://p2u4k1c842.execute-api.us-west-2.amazonaws.com/prod/people?q=${query}`,
      json: true
    })
      .then(data => {
        let cleanedData = data
          .sort((a, b) => {
            let itemA = a.lastName.toUpperCase();
            let itemB = b.lastName.toUpperCase();
            if (itemA < itemB) {
              return -1;
            } else if (itemA > itemB) {
              return 1;
            }
            return 0;
          })
          .slice(0, 5);
        setPeople(cleanedData);
      })
      .catch(err => {
        console.log(err);
      });
  }, [query]);

  if (!people.length) {
    return <PeopleEmptyState />;
  }

  return (
    <Card>
      <CardTitle>
        <PeopleIcon icon={faUserCircle} color={Color['neutral-400']} />
        People
      </CardTitle>
      <CardContent>
        <PeopleList>
          {people.map(person => {
            return (
              <Person key={person.id}>
                <PersonLink
                  href={`http://directory.oregonstate.edu/?type=showfull&osuuid=${person.id}`}
                >
                  <PersonName>
                    {person.firstName} {person.lastName}
                  </PersonName>
                  <PersonDept>{person.department}</PersonDept>
                </PersonLink>
              </Person>
            );
          })}
        </PeopleList>
      </CardContent>
      <CardFooter>
        <PeopleLink href={`http://directory.oregonstate.edu/?type=search&cn=${query}`}>
          OSU Directory
          <Icon icon={faLongArrowRight} color={Color['orange-400']} />
        </PeopleLink>
      </CardFooter>
    </Card>
  );
};

export default People;
