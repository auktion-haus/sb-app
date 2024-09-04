import { useQuery } from "react-query";
import {
  CHAIN_OBJ,
  RPC_URLS,
  SHAMAN_MODULE_NAME,
  getValidChainId,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import auctionHausShamanAbi from "../abis/auctionHausShaman.json";

export type AuctionHausData = {
  auctionHausShaman?: string;
  endTime?: string;
  captain?: string;
  captainsReward?: string;
  lastBidAmount?: string;
  lastBidTokenId?: string;
};

export const useAuctionHaus = ({
  chainId,
  daoId,
  daoShamans,
  yeeterShamanAddress,
}: {
  chainId?: string;
  daoId?: string;
  daoShamans?: Array<string | undefined>;
  yeeterShamanAddress?: string;
}) => {
  const chain = getValidChainId(chainId);
  const shamanAddresses = daoShamans || [];

  const { data, ...rest } = useQuery(
    ["auction-haus", { chainId, daoId }],
    async () => {
      const publicClient = createPublicClient({
        chain: CHAIN_OBJ[chain],
        transport: http(RPC_URLS[chain]),
      });

      let auctionHausShaman,
        endTime,
        captain,
        captainsReward,
        lastBidAmount,
        lastBidTokenId;

      for (let i = 0; i < shamanAddresses.length; i++) {
        if (yeeterShamanAddress && shamanAddresses[i] === yeeterShamanAddress) {
          continue;
        }
        const shamanName = await publicClient.readContract({
          address: shamanAddresses[i] as `0x${string}`,
          abi: auctionHausShamanAbi,
          functionName: "name",
        });

        if (shamanName === SHAMAN_MODULE_NAME) {
          auctionHausShaman = shamanAddresses[i];

          endTime = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: auctionHausShamanAbi,
            functionName: "endTime",
          })) as string;

          captain = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: auctionHausShamanAbi,
            functionName: "captain",
          })) as string;

          captainsReward = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: auctionHausShamanAbi,
            functionName: "captainsReward",
          })) as string;

          lastBidAmount = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: auctionHausShamanAbi,
            functionName: "lastBidAmount",
          })) as string;

          lastBidTokenId = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: auctionHausShamanAbi,
            functionName: "lastBidTokenId",
          })) as string;


          break;
        }
      }

      return {
        auctionHausShaman,
        endTime,
        captain,
        captainsReward,
        lastBidAmount,
        lastBidTokenId,
      } as AuctionHausData;
    },
    { 
      enabled: !!chainId && !!daoId && !!daoShamans && !!yeeterShamanAddress,
      refetchOnWindowFocus: false
    }
  );

  return {
    ...data,
    ...rest,
  };
};
