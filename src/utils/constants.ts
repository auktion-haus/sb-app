import { Chain, base, mainnet, sepolia } from "viem/chains";

import {
  HAUS_NETWORK_DATA,
  HAUS_RPC,
  Keychain,
  KeychainList,
  NetworkConfig,
  ValidNetwork,
} from "@daohaus/keychain-utils";

export const APP_NAME = "AUKTION HAUS";

export const YEET24_REFERRER = "DHYeet24ShamanSummoner.5";
export const SHAMAN_MODULE_NAME = "AuctionHausShamanModule";

export const CURATOR_CONTRACTS: KeychainList = {
  YEET24_SUMMONER: {
    "0xaa36a7": "0x78cf150b2E684562C0510C0b699edE1DCD69b983",
    "0x2105": "0x788C55D87a416F391E93a986AbB1e2b2960d0079",
    "0x1": "0x183185a95174c0499d6dd4266676664de55fb9ba",
  },
  YEETER_SINGLETON: {
    "0xaa36a7": "0x62ff4ca410e9e58f5ce8b2ad03695ef0ad990381",
    "0x2105": "0x8D60971eFf778966356c1cADD76d525E7B25cc6b",
    "0x1": "0x232Cdb4895Cc894beD2fb5300Fb542F3CffA980b",
  },
  YEET24_SINGLETON: {
    "0xaa36a7": "0x59a7C71221d05e30b9d7981AB83f0A1700e51Af8",
    "0x2105": "0x2f3637757875414c938EF80A5aD197aAaCDaA924",
  },
  AUCTION_HAUS_SINGLETON: {
    "0xaa36a7": "0x73EE3aEF94215C360C246fe6e3BFcdB129d091B6",
    "0x1": "",
  }, // todo
  GOV_LOOT_SINGLETON: {
    "0xaa36a7": "0x8a4a9e36106ee290811b89e06e2fafe913507965",
    "0x2105": "0x59a7C71221d05e30b9d7981AB83f0A1700e51Af8",
  },
  GNOSIS_SAFE_PROXY_FACTORY: {
    "0xaa36a7": "0xc22834581ebc8527d974f8a1c97e1bea4ef910bc",
    "0x2105": "0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC",
    "0x1": ""
  },
  GNOSIS_SAFE_MASTER_COPY: {
    "0xaa36a7": "0x69f4d1788e39c87893c980c06edf4b7f686e2938",
    "0x2105": "0x69f4D1788e39c87893C980c06EdF4b7f686e2938",
    "0x1": "0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552" // verify
  },
  UNISWAP_V3_NF_POSITION_MANAGER: {
    "0xaa36a7": "0x1238536071E1c677A632429e3655c799b22cDA52",
    "0x2105": "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1",
  },
  WETH: {
    "0xaa36a7": "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    "0x2105": "0x4200000000000000000000000000000000000006",
  },
  POSTER: {
    "0xaa36a7": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0x2105": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0x1": "0x000000000000cd17345801aa8147b8d3950260ff"
  },
  NOUNS_AUCTION_HOUSE: {
    "0xaa36a7": "0xc0af40e8932ad93ed3237dd0c3fe1efd698c1efe",
    "0x2105": "",
    "0x1": ""
  },
  NOUNS_TOKEN: {
    "0xaa36a7": "0x54BC3fC3977785922336084315318FA3387EEC17",
    "0x2105": "",
    "0x1": ""
  },
};

type KEYCHAIN = {
  [key: string]: string;
};

export const YEETER_GRAPH_URL: KEYCHAIN = {
  "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/8Syem3ZN88cut1wL8AqPHNo658Px7M2CkRuHAGuxvf6j`,
  "0x2105": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/6vyAqRpCyrhLsfd6TfYAssvKywKhxJykkDbPxJZ4ZcEr`,
};

export const DH_GRAPH_URL: KEYCHAIN = {
  "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_GRAPH_API_KEY_MAINNET
  }/subgraphs/id/3k93SNY5Y1r4YYWEuPY9mpCm2wnGoYDKRtk82QZJ3Kvw`,
  "0x2105": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_GRAPH_API_KEY_MAINNET
  }/subgraphs/id/7yh4eHJ4qpHEiLPAk9BXhL5YgYrTrRE6gWy8x4oHyAqW`,
  "0x1": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_GRAPH_API_KEY_MAINNET
  }/subgraphs/id/<subgraph_id>`,
};

export const UNISWAP_URL: Keychain<string> = {
  "0xaa36a7": "https://app.uniswap.org/explore/pools/sepolia/",
  "0x2105": "https://app.uniswap.org/explore/pools/base/",
  "0xa": "https://app.uniswap.org/explore/pools/optimism",
};

export const NOUNS_URL: Keychain<string> = {
  "0xaa36a7": "https://sepolia.etherscan.io/address/0xc0af40e8932ad93ed3237dd0c3fe1efd698c1efe#writeProxyContract",
  "0x2105": "",
  "0x1": "https://nouns.wtf/",
};

export const supportedNetworks = import.meta.env.DEV
  ? {
      "0xaa36a7": HAUS_NETWORK_DATA["0xaa36a7"],
      "0x2105": HAUS_NETWORK_DATA["0x2105"],
      "0x1": HAUS_NETWORK_DATA["0x1"],
    }
  : {
      "0xaa36a7": HAUS_NETWORK_DATA["0xaa36a7"],
      "0x2105": HAUS_NETWORK_DATA["0x1"],
    };

export const targetNetworks: Keychain<NetworkConfig> = {
  "0xaa36a7": HAUS_NETWORK_DATA["0xaa36a7"],
  "0x64": HAUS_NETWORK_DATA["0x64"],
  "0xa": HAUS_NETWORK_DATA["0xa"],
  "0xa4b1": HAUS_NETWORK_DATA["0xa4b1"],
  "0x2105": HAUS_NETWORK_DATA["0x2105"],
  "0x1": HAUS_NETWORK_DATA["0x1"],
};
export const DEFAULT_CHAIN_ID_DEV = "0xaa36a7";
export const DEFAULT_CHAIN_ID_PROD = "0x1";
export const DEFAULT_CHAIN_ID = import.meta.env.DEV
  ? DEFAULT_CHAIN_ID_DEV
  : DEFAULT_CHAIN_ID_DEV; // DEFAULT_CHAIN_ID_PROD;

export const CHAIN_OBJ: {
  [key: string]: Chain;
} = {
  "0xaa36a7": sepolia,
  "0x2105": base,
  "0x1": mainnet,
};

export const RPC_URLS: KEYCHAIN = {
  "0xaa36a7": HAUS_RPC["0xaa36a7"],
  "0x2105": HAUS_RPC["0x2105"],
  "0x1": HAUS_RPC["0x1"],
};

export const getValidChainId = (chainId?: string) => {
  return targetNetworks[chainId as ValidNetwork]?.chainId || DEFAULT_CHAIN_ID;
};
const POINT_O_ONE_ETH = "10000000000000000";
const POINT_OO_ONE_ETH = "1000000000000000";
const GOAL_ETH = "3000000000000000000";

export const SPONSOR_THRESHOLD = POINT_O_ONE_ETH;
export const YEETER_SHAMAN_PERMISSIONS = "2";
export const AUCTIONHAUS_SHAMAN_PERMISSIONS = "3";
export const LOOT_NAME_POSTFIX = " Community Power";
export const LOOT_SYMBOL_PREFIX = "LOOT-";

export const DEFAULT_YEETER_VALUES_DEV = {
  isShares: true,
  feeRecipients: [
    "0xD0f8720846890a7961945261FE5012E4cA39918e",
    "0x4a9a27d614a74ee5524909ca27bdbcbb7ed3b315",
  ], // yeeter team, daohaus eco fund
  feeAmounts: ["15000", "15000"], // 1.5% fees
  multiplier: "10000",
  minThresholdGoal: POINT_O_ONE_ETH,
};
export const DEFAULT_YEETER_VALUES_PROD = {
  isShares: true,
  feeRecipients: [
    "0xD0f8720846890a7961945261FE5012E4cA39918e",
    "0x4a9a27d614a74ee5524909ca27bdbcbb7ed3b315",
  ], // yeeter team, daohaus eco fund
  feeAmounts: ["15000", "15000"], // 1.5% fees
  multiplier: "10000",
  minThresholdGoal: GOAL_ETH,
};

export const DEFAULT_DURATION_PROD = (30*24) * 60 * 60; // 30 days
export const DEFAULT_DURATION_DEV = (7*24) * 60 * 60; // 7 days

const STATUS_WINDOW_LENGTH_DEV = 3 * 60; // 3 mins
const STATUS_WINDOW_LENGTH_PROD = 2 * 60 * 60; // 2 hrs

export const DEFAULT_MEME_YEETER_VALUES = {
  poolFee: "10000", // 1%
  boostRewardFees: "90000", // 9%
};

//

export const DEFAULT_SUMMON_VALUES_DEV = {
  votingPeriodInSeconds: 200,
  gracePeriodInSeconds: 6,
  newOffering: POINT_OO_ONE_ETH,
  quorum: "66",
  sponsorThreshold: SPONSOR_THRESHOLD,
  minRetention: "1",
  votingTransferable: false,
  nvTransferable: true,
};
export const DEFAULT_SUMMON_VALUES_PROD = {
  votingPeriodInSeconds: 259200,
  gracePeriodInSeconds: 172800,
  newOffering: POINT_O_ONE_ETH,
  quorum: "66",
  sponsorThreshold: SPONSOR_THRESHOLD,
  minRetention: "1",
  votingTransferable: false,
  nvTransferable: true,
};

export const DEFAULT_TARGET_DAO_DEV = {}
export const DEFAULT_TARGET_DAO_PROD = {}

export const DEFAULT_TARGET_DAO = import.meta.env.DEV
  ? DEFAULT_TARGET_DAO_DEV
  : DEFAULT_TARGET_DAO_PROD;

export const DEFAULT_YEETER_VALUES = import.meta.env.DEV
  ? DEFAULT_YEETER_VALUES_DEV
  : DEFAULT_YEETER_VALUES_DEV; // DEFAULT_YEETER_VALUES_PROD;

export const DEFAULT_DURATION = import.meta.env.DEV
  ? DEFAULT_DURATION_DEV
  : DEFAULT_DURATION_DEV; //DEFAULT_DURATION_PROD;

export const STATUS_WINDOW_LENGTH = import.meta.env.DEV
  ? STATUS_WINDOW_LENGTH_DEV
  : STATUS_WINDOW_LENGTH_PROD;

export const DEFAULT_SUMMON_VALUES = import.meta.env.DEV
  ? DEFAULT_SUMMON_VALUES_DEV
  : DEFAULT_SUMMON_VALUES_DEV; // DEFAULT_SUMMON_VALUES_PROD;
