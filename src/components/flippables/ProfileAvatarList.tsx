import { ExplorerLink, useDHConnect } from '@daohaus/connect';
import { useDaoMembers } from '@daohaus/moloch-v3-hooks';
import { ProfileAvatar, Tooltip } from '@daohaus/ui';
import { formatValueTo, fromWei, truncateAddress } from '@daohaus/utils';
import React from 'react';
import styled from 'styled-components';
import { ProfileAvatarEns } from '../ProfileAvatarEns';
import { ValidNetwork } from '@daohaus/keychain-utils';

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



const ProfileAvatarList: React.FC = () => {

  const { chainId } = useDHConnect();

  const { members } = useDaoMembers();

  return (
    <AvatarListWrapper>
      {members.length === 0 && <p>None yet</p>}
      {members.map((member, index) => (
        <AvatarWrapper key={index}>
          <ProfileAvatarEns address={member.memberAddress} chainId={chainId as ValidNetwork} member={member} />


        </AvatarWrapper>
      ))}
    </AvatarListWrapper>
  );
};

export default ProfileAvatarList;