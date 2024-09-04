import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  ParLg,
  ParMd,
  ParSm,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";

import { Actions, DetailItem, DetailsContainer, SimpleRow, StyledDialogContent, Wrapper } from "./flipables.styles";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ButtonRouterLink } from "../ButtonRouterLink";



export const TokenOverview = ({
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

  // mock metadata and yeeter

  const metadata = {
    name: dao?.name,
    description: dao?.description,
    avatarImg: dao?.avatarImg,
  };

  if (!metadata || !dao || !yeeterId) {
    return;
  }

  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>AUKTION</BigH1Blue>
        <BigH1Blue>HAUS</BigH1Blue>


        <DetailItem>
          <ParLg>Token Symbol</ParLg>
          <ParMd>{dao.shareTokenSymbol}</ParMd>
          <ParSm>{metadata.name}</ParSm>
          <ParSm>{metadata.description}</ParSm>
        </DetailItem>

        <Actions>

        <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/share`}
          >
            SHARE
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
