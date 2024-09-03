import styled from "styled-components";
import { DataLg, DataXl, H3, H4, ParLg, ParMd, widthQuery } from "@daohaus/ui";
import { APP_NAME } from "../utils/constants";
import {
  BigH1,
  SimpleCol,
  SimpleRow,
  Spacer,
} from "../components/Layout/Layout";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";

import orangeGlasses from "../assets/orange160px.png";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  width: 100%;
  padding: 2rem 0;
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
  .image {
    width: 20%;
    @media ${widthQuery.sm} {
      width: 100%;
    }
  }
  .text {
    width: 60%;
    @media ${widthQuery.sm} {
      width: 100%;
    }
    p {
      margin-bottom: 1rem;
    }
  }
`;

const Bullet = styled(SimpleRow)`
  align-items: center;
  gap: 1rem;
`;

const About = () => {
  return (
    <>
      <WideColumnLayout subtitle="WHAT IS THIS?">
        <div>
          <BigH1>{APP_NAME}</BigH1>
          <Spacer />
          <SimpleRow>
            <H3>DECENTRALIZED COLLECTIVE NOUNS AUCTIONS</H3>
            <ParLg>
              A permissionless and transparent platform designed to democratize
              the auction process. 
            </ParLg>
            <SimpleCol>
              <Bullet>
                <img src={orangeGlasses} height="50px" />
                <ParLg>
                  Auction Haus is a decentralized auction platform to particpant in the Nouns DAO auctions.
                </ParLg>
              </Bullet>
              <Bullet>
                <img src={orangeGlasses} height="50px" />
                <ParLg>
                  Tokenize a Nouns "Block" so a group can participate in the DAO.
                </ParLg>
              </Bullet>
              <Bullet>
                <img src={orangeGlasses} height="50px" />
                <ParLg>
                  Created for the MetaCartel Fam.
                </ParLg>
              </Bullet>
              <Bullet>
                <img src={orangeGlasses} height="50px" />
                <a href="/speedball.pdf" download>
                  <DataLg>Download Whitepaper</DataLg>
                </a>
              </Bullet>
            </SimpleCol>
          </SimpleRow>

          <SectionContainer>
            <div className="text">
              <H4>LAUNCH YOUR HAUDS</H4>
              <ParMd>
                Start a Auction Haus for you and your friends
              </ParMd>
              <ParMd>
                Select a Captain to delegate auction responsibilities and manage votes.
              </ParMd>
            </div>
            <div className="image">
              <img src={orangeGlasses} height="100px" />
            </div>
          </SectionContainer>
          <SectionContainer>
            <div className="text">
              <H4>DAO</H4>
              <ParMd>
                Each token has governance over a DAO treasury. 
              </ParMd>
            </div>
            <div className="image">
              <img src={orangeGlasses} height="100px" />
            </div>
          </SectionContainer>
          <SectionContainer>
            <div className="image">
              <img src={orangeGlasses} height="100px" />
            </div>
            <div className="text">
              <H4>AUCTION HAUS HIGHLIGHTS</H4>
              <ParMd>
                Fully On-chain: The entire process is executed on-chain,
                ensuring transparency and security.
              </ParMd>

              <a href="/speedball.pdf" download>
                <DataXl>Download whitepaper for more</DataXl>
              </a>
            </div>
          </SectionContainer>
        </div>
      </WideColumnLayout>
    </>
  );
};

export default About;
