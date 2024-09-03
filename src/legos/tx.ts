import { POSTER_TAGS } from "@daohaus/utils";
import { buildMultiCallTX } from "@daohaus/tx-builder";
import { APP_CONTRACT } from "./contract";
import { pollLastTX, testLastTX } from "../utils/customTxPoll";

export enum ProposalTypeIds {
  Signal = "SIGNAL",
  IssueSharesLoot = "ISSUE",
  AddShaman = "ADD_SHAMAN",
  TransferErc20 = "TRANSFER_ERC20",
  TransferNetworkToken = "TRANSFER_NETWORK_TOKEN",
  UpdateGovSettings = "UPDATE_GOV_SETTINGS",
  UpdateTokenSettings = "TOKEN_SETTINGS",
  TokensForShares = "TOKENS_FOR_SHARES",
  GuildKick = "GUILDKICK",
  WalletConnect = "WALLETCONNECT",
}

export const APP_TX = {
  CAPTAIN_NEW_BID: {
    id: "CAPTAIN_NEW_BID",
    contract: APP_CONTRACT.AUCTION_HAUS_SHAMAN,
    method: "execute",
    args: [".formValues.maxBid"],
  },
  CAPTAIN_DELEGATE: {
    id: "CAPTAIN_DELEGATE",
    contract: APP_CONTRACT.AUCTION_HAUS_SHAMAN,
    method: "delegateVotes",
    args: [".formValues.delegate"],
  },
  PROPOSE_NEW_CAPTAIN: buildMultiCallTX({
    id: "PROPOSE_NEW_CAPTAIN",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: { type: "static", value: "New Captain" },
        description: {
          type: "static",
          value: "Someone is proposing a new captain",
        },
        // contentURI: `.formValues.link`,
        // contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: "New Captain" },
        // parentId: { type: "static", value: "0" },
        // relatedRecordId: ".formValues.relatedRecord",
        // tags: ".formValues.tags",
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.AUCTION_HAUS_SHAMAN,
        method: "setCaptain",
        args: [
          '.formValues.captain',
        ],
      },
    ],
  }),
  SUMMON_AUCTIONHAUS: {
    id: "SUMMON_AUCTIONHAUS",
    contract: APP_CONTRACT.YEET24_SUMMONER,
    method: "summonBaalFromReferrer",
    argCallback: "assembleMemeSummonerArgs",
    customPoll: {
      fetch: pollLastTX,
      test: testLastTX,
    },
  },
  YEET: {
    id: "YEET",
    contract: APP_CONTRACT.YEETER_SHAMAN,
    method: "contributeEth",
    args: [".formValues.message"],
    overrides: {
      value: ".formValues.amount",
    },
    // customPoll: {
    //   fetch: pollYeet,
    //   test: testYeet,
    // },
  },
  EXECUTE_LP: {
    id: "EXECUTE_LP",
    contract: APP_CONTRACT.MARKET_MAKER_SHAMAN,
    method: "execute",
    args: [],
    // customPoll: {
    //   fetch: pollYeet,
    //   test: testYeet,
    // },
  },

  YEET_COMMENT: {
    id: "YEET_COMMENT",
    contract: APP_CONTRACT.POSTER,
    method: "post",
    args: [
      {
        type: "JSONDetails",
        jsonSchema: {
          daoId: ".daoId",
          table: { type: "static", value: "COMMENT" },
          queryType: { type: "static", value: "list" },
          content: ".formValues.content",
          authorAddress: ".memberAddress",
          createdAt: ".formValues.createdAt",
          chainId: ".chainId",
        },
      },
      { type: "static", value: POSTER_TAGS.daoDatabaseSharesOrLoot },
    ],
  },
};
