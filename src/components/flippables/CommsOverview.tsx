import styled from "styled-components";
import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  ParLg,
  widthQuery,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";

import { Actions, DetailItem, DetailsContainer, Wrapper } from "./flipables.styles";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { YeetComments } from "../YeetComments";
import { ButtonRouterLink } from "../ButtonRouterLink";

const CommentsWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 280px;
  width: 500px;
  background-color: rgba(255, 255, 255, 0.1);
 padding: .5rem;
        @media ${widthQuery.sm} {
        margin-left: 10%;
        padding-left: 10%;
        width: 80%;

`;


export const CommsOverview = ({
  yeeterId,
  daoId,
  daoChain,
  dao
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
  dao: MolochV3Dao
}) => {


  return (
    <Wrapper>

      <DetailsContainer>
      <BigH1Blue>COMMENT</BigH1Blue>

        <DetailItem>
          <ParLg>COMMS</ParLg>
        </DetailItem>

        <CommentsWrapper>
        <YeetComments
          daoId={daoId}
          daoChain={daoChain}
          yeeterId={yeeterId}
          />
        </CommentsWrapper>

        <Actions>
        <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/comment`}
          >
            NEW
          </ButtonRouterLink>
          <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/join`}
          >
            JOIN
          </ButtonRouterLink>

        </Actions>
      </DetailsContainer>

      

    </Wrapper>
  );
};
