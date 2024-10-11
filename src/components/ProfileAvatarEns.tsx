import { ExplorerLink, useDHConnect } from '@daohaus/connect';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useDaoMembers, useProfile } from '@daohaus/moloch-v3-hooks';
import { ProfileAvatar, Tooltip } from '@daohaus/ui';
import { formatValueTo, fromWei, truncateAddress } from '@daohaus/utils';
import React from 'react';
import styled from 'styled-components';


const TooltipContent = styled.div`
  background-color: ${({ theme }) => theme.info.step12};
  color: ${({ theme }) => theme.info.step1};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;


export const ProfileAvatarEns = ({
    address,
    chainId,
    member,
}: {
    address: string;
    chainId: ValidNetwork;
    member: any;
}) => {

    const { profile } = useProfile({
        address: address
    })

    return (
        <Tooltip content={(<TooltipContent>{profile?.ens || truncateAddress(address)} {formatValueTo({
            value: fromWei(member.shares.toString()),
            decimals: 2,
            format: "numberShort",
        })}<ExplorerLink chainId={chainId} address={address} /></TooltipContent>)}
            triggerEl={profile ? 
                (<ProfileAvatar size='md' address={address} src={profile.avatar} alt="thing" />) : 
                (<ProfileAvatar size='md' address={address} alt="thing" />)} />
    );
};
