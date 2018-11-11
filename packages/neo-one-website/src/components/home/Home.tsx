import { Background, Button, LineLogoPrimary, Link } from '@neo-one/react-common';
import * as React from 'react';
import { as, Box, Grid, styled } from 'reakit';
import { prop } from 'styled-tools';
import { RouterLink } from '../RouterLink';
import { Authoring } from './Authoring';
import { ContentWrapperBase } from './ContentWrapperBase';
import { DeveloperTools } from './DeveloperTools';
import { EditorContent } from './EditorContent';
import { Proof } from './Proof';
import { Testing } from './Testing';

const StyledBackground = styled(Background)`
  display: grid;
  place-content: center;
  place-items: center;
  gap: 32px;
  color: ${prop('theme.gray0')};
  justify-content: center;
  padding: 40px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledLineLogoPrimary = styled(LineLogoPrimary)`
  &&& {
    height: 40px;
  }
`;

const Headline = styled(Box)`
  ${prop('theme.fonts.axiformaRegular')};
  ${prop('theme.fontStyles.display1')};
  text-align: center;
`;

const ButtonWrapper = styled(Grid)`
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 24px;
`;

const LinkButton = as(RouterLink)(Button);
const StyledLinkButton = styled(LinkButton)`
  ${prop('theme.fontStyles.subheading')};
`;

const StyledLink = styled(as(RouterLink)(Link))`
  ${prop('theme.fontStyles.subheading')};
  color: ${prop('theme.accent')};

  &:hover {
    color: ${prop('theme.primary')};
  }
`;

const CenterContentWrapper = styled(ContentWrapperBase)`
  flex: 1 1 auto;
  justify-content: center;
`;

const ProofsWrapper = styled(Grid)`
  grid-auto-flow: column;
  padding-top: 64px;
  padding-bottom: 64px;

  @media (max-width: ${prop('theme.breakpoints.md')}) {
    padding-top: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid ${prop('theme.gray3')};
  }
`;

const ProofsInnerWrapper = styled(Grid)`
  grid-auto-flow: column;

  @media (max-width: ${prop('theme.breakpoints.md')}) {
    mask-image: linear-gradient(to right, transparent, white 10px, white 90%, transparent);
    overflow-x: scroll;
  }
`;

const FeaturesWrapper = styled(Grid)`
  padding-top: 64px;
  padding-bottom: 64px;
  grid-gap: 64px;

  @media (max-width: ${prop('theme.breakpoints.md')}) {
    padding-top: 32px;
    padding-bottom: 32px;
    grid-gap: 32px;
  }
`;

const Wrapper = styled(Grid)`
  justify-items: center;
`;

export const Home = (props: {}) => (
  <Wrapper {...props}>
    <StyledBackground>
      <StyledLineLogoPrimary />
      <Headline>The One for easy, fast, & fun NEO blockchain development</Headline>
      <ButtonWrapper>
        <StyledLinkButton to="docs/getting-started">Get Started</StyledLinkButton>
        <StyledLink to="course" linkColor="primary">
          Take Course >
        </StyledLink>
      </ButtonWrapper>
    </StyledBackground>
    <CenterContentWrapper>
      <ProofsWrapper>
        <ProofsInnerWrapper>
          <Proof
            title="Powerful"
            lines={[
              'NEO•ONE makes coding, testing and deploying NEO dapps easier, faster, more efficient and much more enjoyable.',
              'The complete end-to-end framework offers effortless startup and empowers you with tooling every step of the way.',
            ]}
          />
          <Proof
            title="Intuitive"
            lines={[
              'Write idiomatic TypeScript smart contracts that look, feel and work just like a normal TypeScript program.',
              'Test smart contracts with familiar frameworks like Jest using the intuitive client APIs.',
            ]}
          />
          <Proof
            title="Approachable"
            lines={[
              'NEO•ONE courses distill the essentials of dapp development into bite-sized interactive learning chapters. Build, test and write the UI for smart contracts with the NEO•ONE editor.',
              "With the most comprehensive documentation available for NEO, you'll always have a resource to reference.",
            ]}
          />
        </ProofsInnerWrapper>
      </ProofsWrapper>
    </CenterContentWrapper>
    <EditorContent />
    <FeaturesWrapper>
      <Authoring />
      <Testing />
      <DeveloperTools />
    </FeaturesWrapper>
  </Wrapper>
);
