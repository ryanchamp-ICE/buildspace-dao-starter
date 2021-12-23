import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xAfaC375c836988CcAe4A411Fa72e1067834Dab54");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "SweetCityDAO Membership",
      description: "Test DAO for the members of Sweet City.",
      image: readFileSync("scripts/assets/fighting-games-are-great-evo-2019.jpg"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log("Successfully deployed bundleDrop module, address: ", bundleDropModule.address);
    console.log("bundleDrop metadata: ", await bundleDropModule.getMetadata());
  } catch (error) {
    console.log("Failed to deploy bundleDrop module ", error);
  }
})()