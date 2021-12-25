import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(process.env.TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    const amount = 1_000_000;
    
    // 18 decimals is the standard for ERC-20 tokens
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);

    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    // Print how many there are now
    console.log(`There now is ${ethers.utils.formatUnits(totalSupply, 18)} $SWEET in circulation`);
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();