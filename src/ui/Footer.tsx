import React from 'react';
import styled from 'styled-components';
import { Color, theme } from '../theme';

const FooterWrapper = styled.footer`
  background-color: ${Color.black};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem;
  margin-top: ${theme.spacing.unit * 2}px;
`;

const FooterNote = styled.p`
  font-size: ${theme.fontSize[18]};
  color: ${Color.white};
`;

const FooterLink = styled.a`
  color: ${Color['orange-400']};
  &:hover {
    text-decoration: none;
  }
`;

const FooterCopyright = styled.p`
  color: ${Color.white};
  font-size: ${theme.fontSize[14]};
  margin: 0;
`;

const FooterCopyrightLink = styled.a`
  color: ${Color.white};
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterNote>
        Not finding your result? Try these{' '}
        <FooterLink href="https://support.google.com/websearch/answer/134479">
          search tips
        </FooterLink>{' '}
        or{' '}
        <FooterLink href="http://communications.oregonstate.edu/webform/contact-osu">
          contact us for help.
        </FooterLink>
      </FooterNote>
      <FooterCopyright>
        <FooterCopyrightLink href="https://oregonstate.edu/copyright">
          Copyright
        </FooterCopyrightLink>{' '}
        ©{new Date().getFullYear()} Oregon State University
      </FooterCopyright>
      <FooterCopyright>
        <FooterCopyrightLink href="https://oregonstate.edu/official-web-disclaimer">
          Disclaimer
        </FooterCopyrightLink>{' '}
        |{' '}
        <FooterCopyrightLink href="https://accessibility.oregonstate.edu">
          Accessibility Information
        </FooterCopyrightLink>
      </FooterCopyright>
    </FooterWrapper>
  );
};

export default Footer;
