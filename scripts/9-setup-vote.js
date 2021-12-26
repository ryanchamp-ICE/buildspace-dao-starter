import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract
const voteModule = sdk.getVoteModule(process.env.VOTE_MODULE_ADDRESS);

// This is our ERC-20 token contract
const tokenModule = sdk.getTokenModule(process.env.TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    await tokenModule.grantRole("minter", voteModule.address);

    console.log("Successfully gave vote module permissions to act on token module");
  } catch (error) {
    console.error("Failed to grant vote module permissions on token module", error);
    process.exit(1);
  }

  try {
    // Grab our wallet's token
    const ownenTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownenTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("Successfully transferred tokens to vote module");
  } catch (error) {
    console.error("Failed to transfer tokens to vote module", error);
  }
})();
