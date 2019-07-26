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
  font-size: ${theme.fontSize[16]};
`;

const PersonSkelName = styled(PersonName)`
  @keyframes person-waiting {
    from {
      background-color: ${Color['neutral-100']};
    }
    to {
      background-color: ${Color['neutral-200']};
    }
  }
  background-color: ${Color['neutral-100']};
  height: ${theme.fontSize[16]};
  width: 85%;
  margin: 4px 0;
  animation: person-waiting 900ms infinite alternate;
`;

const PersonDept = styled.p`
  margin: 0;
  font-size: ${theme.fontSize[12]};
`;

const PersonSkelDept = styled(PersonDept)`
  @keyframes person-waiting {
    from {
      background-color: ${Color['neutral-100']};
    }
    to {
      background-color: ${Color['neutral-200']};
    }
  }
  background-color: ${Color['neutral-100']};
  height: ${theme.fontSize[12]};
  width: 70%;
  margin: 3px 0;
  animation: person-waiting 900ms infinite alternate;
`;

const PeopleList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: ${Color['neutral-700']};
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

const PeopleTotal = styled.p`
  margin: 0;
  margin-top: ${theme.spacing.unit * 2 + 2}px;
  padding: 0;
  font-size: ${theme.fontSize[14]};
  color: ${Color['neutral-550']};
  font-style: italic;
  font-weight: 300;
`;

const PeopleTitle: React.FC = () => {
  return (
    <CardTitle>
      <PeopleIcon icon={faUserCircle} color={Color['neutral-400']} />
      People
    </CardTitle>
  );
};

const PeopleFooter = ({ href }) => {
  return (
    <CardFooter>
      <PeopleLink href={href}>
        OSU Directory
        <Icon icon={faLongArrowRight} color={Color['orange-400']} />
      </PeopleLink>
    </CardFooter>
  );
};

const PeopleEmptyState: React.FC = () => {
  return (
    <Card>
      <PeopleTitle />
      <CardContent>
        <PeopleStatus>No people found.</PeopleStatus>
      </CardContent>
      <PeopleFooter href="http://directory.oregonstate.edu" />
    </Card>
  );
};

const PeopleWaiting: React.FC = () => {
  return (
    <Card>
      <PeopleTitle />
      <CardContent>
        <PeopleList>
          <Person>
            <PersonSkelName />
            <PersonSkelDept />
          </Person>
          <Person>
            <PersonSkelName />
            <PersonSkelDept />
          </Person>
        </PeopleList>
      </CardContent>
    </Card>
  );
};

const People = ({ query }: { query: String }) => {
  const [people, setPeople] = useState<any>(null);

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
        setPeople([]);
      });
  }, [query]);

  if (people === null) {
    return <PeopleWaiting />;
  } else if (!people.length) {
    return <PeopleEmptyState />;
  }

  return (
    <Card>
      <PeopleTitle />
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
        <PeopleTotal>
          Showing {people.length < 5 ? people.length : 5} of {people.length}
        </PeopleTotal>
      </CardContent>
      <PeopleFooter href={`http://directory.oregonstate.edu/?type=search&cn=${query}`} />
    </Card>
  );
};

export default People;
