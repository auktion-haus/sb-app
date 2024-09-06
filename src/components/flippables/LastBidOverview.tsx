
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
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { NounsImage } from "./NounsImage";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { AuctionHausData } from "../../hooks/useAuctionHaus";



export const LastBidOverview = ({
  auctionHausData,
}: {
  auctionHausData?: AuctionHausData
}) => {

  console.log("auctionHausData", auctionHausData);

  if (!auctionHausData) {
    return null;
  }

  return (
    <Wrapper>


      {Number(auctionHausData.lastBidTokenId) == 0 ? (
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
              <ParLg>TokenId {auctionHausData.lastBidTokenId?.toString()}</ParLg>
              <NounsImage size="50" nounId={auctionHausData.lastBidTokenId?.toString() || "85"} />

            </DetailItem>
            <DetailItem>
              <Label>Amount</Label>
              <ParMd>
                {formatValueTo({
                  value: fromWei(auctionHausData.lastBidAmount?.toString() || "0"),
                  decimals: 18,
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
