import React, { useState, useEffect } from 'react';
import { faIdCard, faLongArrowRight, faUserCircle } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import request from 'request-promise';
import { Color, theme } from '../theme';
import Icon from './Icon';
import { Card, CardSplit } from './Card';

const PeopleCard = styled(Card)`
  padding: ${theme.spacing.unit * 2}px;
`;

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

const PeopleTitle = styled.h2`
  padding: 0;
  font-weight: 300;
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[18]};
  margin: 0;
`;

const PeopleList = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: ${theme.spacing.unit}px;
  padding: 0;
  padding-top: ${theme.spacing.unit}px;
  color: ${Color['neutral-700']};
  font-size: ${theme.fontSize[16]};
  font-weight: 300;
`;

const Person = styled.li`
  padding: ${theme.spacing.unit}px 0;
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
    <PeopleCard>
      <PeopleTitle>
        <PeopleIcon icon={faUserCircle} color={Color['neutral-400']} />
        People
      </PeopleTitle>
      <CardSplit />
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
      <PeopleLink href={`http://directory.oregonstate.edu/?type=search&cn=${query}`}>
        OSU Directory
        <Icon icon={faLongArrowRight} color={Color['orange-400']} />
      </PeopleLink>
    </PeopleCard>
  );
};

export default People;
