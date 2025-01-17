import { Interface } from "@ethersproject/abi";
import { EventData } from "@/events-sync/data";
import { Nouns } from "@0xlol/sdk";

import { config } from "@/config/index";

export const auctionSettled: EventData = {
  kind: "nouns-auction-settled",
  addresses: { [Nouns.Addresses.AuctionHouse[config.chainId]?.toLowerCase()]: true },
  topic: "0xc9f72b276a388619c6d185d146697036241880c36654b1a3ffdad07c24038d99",
  numTopics: 2,
  abi: new Interface([
    `event AuctionSettled(
      uint256 indexed nounId,
      address winner,
      uint256 amount
    )`,
  ]),
};
