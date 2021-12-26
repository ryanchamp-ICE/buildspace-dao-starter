import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js"

// Address to ERC-1155 membership NFT contract
const bundleDropModule = sdk.getBundleDropModule(process.env.BUNDLE_DROP_ADDRESS);

// Address to our ERC-20 governance token contract
const tokenModule = sdk.getTokenModule(process.env.TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    // Get address of all holders of membership NFT (tokenId == 0)
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

    if (walletAddresses.length === 0) {
      console.log("No membership NFTs have been claimed yet, maybe get some friends to claim your free NFTs!");
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      // Pick random number between 1000 and 10000
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log(`Going to airdrop ${randomAmount} tokens to ${address}`);
      
      // set up the target
      const airdropTarget = {
        address,
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18)
      };

      return airdropTarget;
    });

    // Call transferBatch on all airdrop targets
    console.log("Starting airdrop...");
    await tokenModule.transferBatch(airdropTargets);
    console.log("Successfully airdropped tokens to all holders of the NFT!");
  } catch (error) {
    console.error("Failed to airdrop tokens", error);
  }
})();