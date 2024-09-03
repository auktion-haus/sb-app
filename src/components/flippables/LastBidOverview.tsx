
import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  Avatar,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  Label,
  ParLg,
  ParMd,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";

import { Actions, DetailItem, DetailsContainer, SimpleRow, StyledDialogContent, Wrapper } from "./flipables.styles";
import { useAuctionHaus } from "../../hooks/useAuctionHaus";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { NounsImage } from "./NounsImage";
import { formatValueTo, fromWei } from "@daohaus/utils";



export const LastBidOverview = ({
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


  const { auctionHausShaman, lastBidAmount, lastBidTokenId } = useAuctionHaus({
    daoId,
    yeeterShamanAddress: yeeterId,
    chainId: daoChain,
    daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
  });



  return (
    <Wrapper>


      {Number(lastBidTokenId) == 0 ? (
        <DetailsContainer>
          <BigH1Blue>LAST BID</BigH1Blue>

          <DetailItem>
            <ParLg>No Bids Yet</ParLg>

          </DetailItem>

        </DetailsContainer>
      ) :
        (
          <DetailsContainer>
            <BigH1Blue>LAST BID</BigH1Blue>

            <DetailItem>
              <ParLg>TokenId {lastBidTokenId?.toString()}</ParLg>
              <NounsImage size="50" nounId={lastBidTokenId?.toString() || "85"} />

            </DetailItem>
            <DetailItem>
              <Label>Amount</Label>
              <ParMd>
                {formatValueTo({
                  value: fromWei(lastBidAmount?.toString() || "0"),
                  decimals: 5,
                  format: "numberShort",
                })}
              </ParMd>
            </DetailItem>

            <Actions>
              <Button size="lg" variant="ghost">VIEW</Button>
            </Actions>
          </DetailsContainer>)}



    </Wrapper>
  );
};
