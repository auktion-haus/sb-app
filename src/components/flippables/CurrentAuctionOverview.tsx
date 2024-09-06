import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import {

  AddressDisplay,

  DataIndicator,

  Link,

  ParLg,
  ParMd,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";
import { Actions, DetailItem, DetailsContainer, Wrapper } from "./flipables.styles";

import { formatShortDateTimeFromSeconds, formatValueTo, fromWei } from "@daohaus/utils";
import { useMemo } from "react";
import { ButtonRouterLink } from "../ButtonRouterLink";
import { NOUNS_URL } from "../../utils/constants";


export const CurrentAuctionOverview = ({
  daoId,
  daoChain,
  yeeterId,
  auction
}: {
  daoId: string;
  daoChain: ValidNetwork;
  yeeterId?: string;
  auction: any;
}) => {


  // const { multiplier, minTribute } = useYeeter({ chainId: daoChain as ValidNetwork, daoId: daoId, shamanAddress: yeeterId });

  const memoizedAuction = useMemo(() => auction, [auction]);

  if (!memoizedAuction || !yeeterId || !daoId) {
    return null;
  }

  return (
    <Wrapper>
      <DetailsContainer>
        <BigH1Blue>CURRENT</BigH1Blue>
        <BigH1Blue>AUCTION</BigH1Blue>


        <DetailItem>
          <ParLg>TokenID: {memoizedAuction.nounId.toString()}</ParLg>
          <DataIndicator
            // label="Raised"
            data={`${formatValueTo({
              value: fromWei(memoizedAuction.amount.toString()),
              decimals: 5,
              format: "numberShort",
            })}  ${HAUS_NETWORK_DATA[daoChain as ValidNetwork]?.symbol}`}
          />
          <ParMd>BIDDER:</ParMd>
          <AddressDisplay address={memoizedAuction.bidder} truncate copy />
          {memoizedAuction.endTime < Date.now() / 1000 ? (<Link
            href={`${NOUNS_URL[daoChain]}`} target="_blank" rel="noopener noreferrer"
          >
            AUCTION ENDED (SETTLE)
          </Link>) : <ParMd>ENDS: {formatShortDateTimeFromSeconds(memoizedAuction.endTime.toString())}</ParMd>}
        </DetailItem>

        <Actions>
          {memoizedAuction.endTime > Date.now() / 1000 &&
            (<ButtonRouterLink
              to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/bid`}
            >
              CAPTAIN: NEW BID
            </ButtonRouterLink>)}
        </Actions>
      </DetailsContainer>



    </Wrapper>
  );
};
