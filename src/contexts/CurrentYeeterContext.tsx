import React, { ReactNode, useContext } from "react";
import { AuctionHausData } from "../hooks/useAuctionHaus";
import { Auction } from "../hooks/useNounsAuctionHouse";

type CurrentYeeterContextType = {
  shamanAddress?: string;
  auctionHausShamanData?: AuctionHausData;
  auction?: Auction
};

export const CurrentYeeterContext =
  React.createContext<CurrentYeeterContextType>({
    shamanAddress: undefined,
    auctionHausShamanData: undefined,
    auction: undefined
  });

type CurrentYeeterContextProps = {
  children: ReactNode;
  shamanAddress?: string;
  auctionHausShamanData?: AuctionHausData;
  auction?: Auction
};

export const CurrentYeeterProvider = ({
  children,
  shamanAddress,
  auctionHausShamanData,
  auction
}: CurrentYeeterContextProps) => {
  return (
    <CurrentYeeterContext.Provider
      value={{
        shamanAddress,
        auctionHausShamanData,
        auction: auction
      }}
    >
      {children}
    </CurrentYeeterContext.Provider>
  );
};

export const useCurrentYeeter = () => useContext(CurrentYeeterContext);
