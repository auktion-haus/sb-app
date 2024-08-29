
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
  Link,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";
import {
  formatLootForMin,
  formatMinContribution,
} from "../../utils/yeetDataHelpers";
import { formatShortDateTimeFromSeconds } from "@daohaus/utils";
import { CopyToClipboardButton } from "../CopyToClipboardButton";
import { RiExternalLinkLine } from "react-icons/ri";

import { Actions, DetailItem, DetailsContainer, SimpleRow, StyledDialogContent, Wrapper } from "./flipables.styles";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { useDaoProposals } from "@daohaus/moloch-v3-hooks";


export const ProposalOverview = ({
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

  const { proposals } = useDaoProposals({
    daoChain: daoChain,
    daoId: daoId
  });



  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>Proposals</BigH1Blue>
        <DetailItem>
          <ParLg>Proposals</ParLg>
          <ParMd>{!proposals.length ? "no proposals yet" : proposals.length}</ParMd>
        </DetailItem>

        {proposals.filter((prop) => prop.status == 'active').map((proposal) => (
          <DetailItem key={proposal.proposalId}>
            <ParLg>{proposal.title}</ParLg>
            <ParMd>{proposal.details}</ParMd>
          </DetailItem>
        ))}
        <Actions>
          <Link
            href={`http://admin.daohaus.club/#/molochv3/${daoChain}/${daoId}`} target="_blank" rel="noopener noreferrer"
          >
            New Proposal
          </Link>
          <Link
            href={`http://admin.daohaus.club/#/molochv3/${daoChain}/${daoId}`} target="_blank" rel="noopener noreferrer"
          >
            Vote
          </Link>
          <Link
            href={`http://admin.daohaus.club/#/molochv3/${daoChain}/${daoId}`} target="_blank" rel="noopener noreferrer"
          >
            Share
          </Link>
        </Actions>
      </DetailsContainer>



    </Wrapper>
  );
};
