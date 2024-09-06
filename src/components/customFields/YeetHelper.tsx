import React, { useMemo } from "react";
import { Buildable, Field, DataXs, ParLg } from "@daohaus/ui";
import { useParams } from "react-router-dom";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import {
  formatLootForMin,
  formatMinContribution,
} from "../../utils/yeetDataHelpers";
import { YeeterItem } from "../../utils/types";
import { useYeeter } from "../../hooks/useYeeter";

export const YeetHelper = (props: Buildable<Field>) => {
  const { daoId, daoChain } = useParams();
  const { shamanAddress } = useCurrentYeeter();
  const memoizedShamanAddress = useMemo(() => shamanAddress, [shamanAddress]);

  const { multiplier, minTribute, isEnded } = useYeeter({ chainId: daoChain as ValidNetwork, daoId: daoId, shamanAddress: memoizedShamanAddress });

  const memoizedMinTribute = useMemo(() => minTribute, [minTribute]);
  const memoizedMultiplier = useMemo(() => multiplier, [multiplier]);


  if (!memoizedMinTribute || !memoizedMultiplier) return null;

  return (
    <>
      {!isEnded && (<DataXs>
        Receive {formatLootForMin(memoizedMultiplier, memoizedMinTribute)} tokens per{" "}
        {formatMinContribution(memoizedMinTribute)}{" "}
        {HAUS_NETWORK_DATA[daoChain as ValidNetwork]?.symbol} contributed
      </DataXs>)}
      {isEnded && <ParLg> YEET PERIOD ENDED!</ParLg>}
    </>
  );
};