import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { H4, widthQuery } from "@daohaus/ui";
import { useCurrentYeeter } from "../contexts/CurrentYeeterContext";
import { Spacer } from "../components/Layout";
import { YeeterDetails } from "../components/YeeterDetails";
import { YeeterActions } from "../components/YeeterActions";
import { YeetList } from "../components/YeetList";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";
import styled from "styled-components";
import { TokenOverview } from "../components/TokenOverview";
import { PresalePhase } from "../components/PresalePhase";

const ColumnContainer = styled.div`
  width: 100%;
  .split {
    display: flex;
    flex-direction: row;
    gap: 5rem;
    @media ${widthQuery.md} {
      flex-direction: column;
    }
  }
  @media ${widthQuery.sm} {
    padding: 2rem 0;
    margin-top: 3rem;
  }
`;

export function Yeet() {
  const { daoChain, daoId } = useCurrentDao();
  const { shamanAddress } = useCurrentYeeter();

  return (
    <WideColumnLayout>
      {shamanAddress && daoId && daoChain && (
        <ColumnContainer>
          <div className="split">
            <div>
              <TokenOverview
                yeeterId={shamanAddress}
                daoId={daoId}
                daoChain={daoChain}
              />

              {/* <YeeterDetails
                yeeterId={shamanAddress}
                daoId={daoId}
                daoChain={daoChain}
              /> */}
            </div>
            <div>
              <PresalePhase
                yeeterId={shamanAddress}
                daoId={daoId}
                daoChain={daoChain}
              />
              {/* <H4>Actions</H4>
              <YeeterActions
                yeeterId={shamanAddress}
                daoId={daoId}
                daoChain={daoChain}
              />
              <H4>Yeets</H4>
              {shamanAddress && daoChain && (
                <YeetList yeeterId={shamanAddress} daoChain={daoChain} />
              )} */}
            </div>
          </div>
        </ColumnContainer>
      )}
    </WideColumnLayout>
  );
}

export default Yeet;
