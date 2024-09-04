import styled from "styled-components";
import { ValidNetwork } from "@daohaus/keychain-utils";
import {

  ParLg,
  ParMd,
  ParSm,
  ProfileAvatar,
  AddressDisplay,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";


import { Actions, DetailItem, DetailsContainer,  Wrapper } from "./flipables.styles";
import {  useDaoMembers, useProfile } from "@daohaus/moloch-v3-hooks";
import { formatValueTo, fromWei, ZERO_ADDRESS } from "@daohaus/utils";

import { useMemo } from "react";
import { ButtonRouterLink } from "../ButtonRouterLink";


const LeaderBoard = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  gap: 1rem;
`

const LeaderBoardItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;

`

export const LeaderBoardOverview = ({
  yeeterId,
  daoId,
  daoChain,
  captain
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
  captain?: string;
}) => {

  if (!captain) {
    return null;
  }

  const memoizedCaptain = useMemo(() => captain, [captain]);


  const { profile: captainProfile } = useProfile({
    address: memoizedCaptain || ZERO_ADDRESS
  })

  const memoizedCaptainProfile = useMemo(() => captainProfile, [captainProfile]);

  const { members } = useDaoMembers({ daoId, daoChain });



  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>TOP HOLDERS</BigH1Blue>
        <LeaderBoard>


          {members.sort((a, b) => Number(b.shares) - Number(a.shares)).slice(0, 5)
          .map((member, index) => (
            <LeaderBoardItem key={index}>
              <ParSm>{formatValueTo({
                value: fromWei(member.shares.toString()),
                decimals: 2,
                format: "numberShort",
              })}</ParSm>
              {/* <ProfileAvatar size="sm" address={member.memberAddress} src={""} /> */}
              <AddressDisplay address={member.memberAddress} truncate copy />
            </LeaderBoardItem>
          ))
          }
          {members.length === 0 && (
            <ParMd>No members yet</ParMd>
          )}

        </LeaderBoard>

        {memoizedCaptainProfile?.address && (<DetailItem>
          <ParLg>Captain</ParLg>
          <ProfileAvatar size="xl" address={memoizedCaptainProfile?.address} src={memoizedCaptainProfile.avatar || ""} />
          {memoizedCaptainProfile?.address && <AddressDisplay address={memoizedCaptainProfile.address} truncate copy />}
        </DetailItem>)}
        <Actions>
        <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/new-captain`}
          >
            PROPOSE NEW CAPTAIN
          </ButtonRouterLink>

        </Actions>
      </DetailsContainer>

    </Wrapper>
  );
};
