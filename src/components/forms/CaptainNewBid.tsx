
import { useCallback, useState } from "react";
import { YeeterItem } from "../../utils/types";
import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../../legos/forms";
import { AppFieldLookup } from "../../legos/fieldConfig";
import { Button, ParMd, widthQuery } from "@daohaus/ui";
import styled from "styled-components";
import { ButtonRouterLink } from "../ButtonRouterLink";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const BackButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    `;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
        @media ${widthQuery.sm} {
        .builder-inner-form {
          margin-left: 10rem;
          width: 35rem;
        }
    `;

export const CaptainNewBidForm = () => {
  const { daoChain, daoId } = useCurrentDao();
  const { shamanAddress } = useCurrentYeeter();

  if (!daoId || !daoChain || !shamanAddress) return null;


  const [txSuccess, setTxSuccess] = useState(false);
  const [pollSuccess, setPollSuccess] = useState<boolean>(false);
  const [pollResult, setPollResult] = useState<YeeterItem | null>(null);

  const onFormComplete = useCallback((result: any) => {
    console.log("result on success handle yeets", result);
    setPollSuccess(true);
    setPollResult(result);
  }, []);


  return (
    <FormWrapper>
      <BackButtonWrapper>
        <ButtonRouterLink
          to={`/molochv3/${daoChain}/${daoId}/${shamanAddress}`}
        >
          <ParMd>Back To Dashboard</ParMd>
        </ButtonRouterLink>
      </BackButtonWrapper>
      {!pollSuccess && (
        <>
          <FormBuilder
            form={APP_FORM.CAPTAIN_NEW_BID_FORM}
            customFields={AppFieldLookup}
            targetNetwork={daoChain}
            submitButtonText="BID"
            lifeCycleFns={{
              onPollSuccess: (result) => {
                console.log("poll success", result);
                onFormComplete(result);
              },
              onTxSuccess: (result) => {
                setTxSuccess(true);
              },
            }}
          />

        </>
      )}
      {pollSuccess && (
        <SuccessWrapper>
          <ParMd>{`CAPTAIN AHOY! I'm doing my part!`}</ParMd>

          <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/${shamanAddress}`}
          >
            <ParMd>See your YEET and others here</ParMd>
          </ButtonRouterLink>

        </SuccessWrapper>
      )}
    </FormWrapper>
  )
}