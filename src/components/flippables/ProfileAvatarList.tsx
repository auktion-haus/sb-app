import { ExplorerLink } from '@daohaus/connect';
import { useDaoMembers } from '@daohaus/moloch-v3-hooks';
import { ProfileAvatar, Tooltip } from '@daohaus/ui';
import { formatValueTo, fromWei, truncateAddress } from '@daohaus/utils';
import React from 'react';
import styled from 'styled-components';
import { DEFAULT_CHAIN_ID } from '../../utils/constants';

const AvatarListWrapper = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.card.bgColor};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TooltipContent = styled.div`
  background-color: ${({ theme }) => theme.info.step12};
  color: ${({ theme }) => theme.info.step1};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;


const ProfileAvatarList: React.FC = () => {

  const { members } = useDaoMembers();

  return (
    <AvatarListWrapper>
      {members.length === 0 && <p>None yet</p>}
      {members.map((member, index) => (
        <AvatarWrapper key={index}>
          <Tooltip content={(<TooltipContent>{truncateAddress(member.memberAddress)} {formatValueTo({
            value: fromWei(member.shares.toString()),
            decimals: 2,
            format: "numberShort",
          })}<ExplorerLink chainId={DEFAULT_CHAIN_ID} address={member.memberAddress} /></TooltipContent>)} triggerEl={(<ProfileAvatar size='md' address={member.memberAddress} alt="thing" />)}>

          </Tooltip>
        </AvatarWrapper>
      ))}
    </AvatarListWrapper>
  );
};

export default ProfileAvatarList;