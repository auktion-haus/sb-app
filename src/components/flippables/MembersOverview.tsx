import styled from "styled-components";
import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  ParLg,
  ParMd,
  ProfileAvatar,
  AddressDisplay,
  ParSm,
  Tooltip,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";

import { formatShortDateTimeFromSeconds, formatValueTo, fromWei, ZERO_ADDRESS } from "@daohaus/utils";

import { DetailItem, DetailItemBg, DetailsContainer,  Wrapper } from "./flipables.styles";
import { useProfile } from "@daohaus/moloch-v3-hooks";

import { useMemo } from "react";
import { ExplorerLink, useDHConnect } from "@daohaus/connect";

const TooltipContent = styled.div`
  background-color: ${({ theme }) => theme.info.step12};
  color: ${({ theme }) => theme.info.step1};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;


export const MembersOverview = ({
  captain,
  captainsReward,
  captainMaxBid,
}: {
  captain?: string;
  captainsReward?: string;
  captainMaxBid?: string;
}) => {

  const { chainId } = useDHConnect();

  if (!captain || !captainsReward) {
    return null;
  }

  const { profile: captainProfile } = useProfile({
    address: captain || ZERO_ADDRESS
  })

  const memoizedCaptainProfile = useMemo(() => captainProfile, [captainProfile]);


  if (!memoizedCaptainProfile) {
    return;
  }
  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>Members</BigH1Blue>

        <DetailItemBg>
          <ParLg>Captain:</ParLg>
          <ProfileAvatar size="xl" address={memoizedCaptainProfile?.address} src={memoizedCaptainProfile.avatar || ""} />
          <ExplorerLink chainId={chainId} address={memoizedCaptainProfile?.address} />



          {memoizedCaptainProfile?.address && (<>
            <AddressDisplay address={memoizedCaptainProfile.address} truncate copy />
          </>)}
        </DetailItemBg>
        <DetailItem>
          <Tooltip content={(<TooltipContent>Reward for captain action </TooltipContent>)} triggerEl={<ParMd>Captains Reward:</ParMd>} />


          <ParSm>{formatValueTo({
            value: fromWei(captainsReward?.toString() || "0"),
            decimals: 2,
            format: "numberShort",
          })}</ParSm>
        </DetailItem>
        <DetailItem>
          <Tooltip content={(<TooltipContent>Captain maximum bid (after this it will be the minimum) </TooltipContent>)} triggerEl={<ParMd>Captains Max Bid:</ParMd>} />


          <ParSm>{formatValueTo({
            value: fromWei(captainMaxBid?.toString() || "0"),
            decimals: 2,
            format: "numberShort",
          })}</ParSm>
        </DetailItem>

      </DetailsContainer>



    </Wrapper>
  );
};
