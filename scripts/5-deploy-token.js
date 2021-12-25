import sdk from "./1-initialize-sdk.js"

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "SweetCityDAO Governance Token",
      symbol: "SWEET"
    });

    console.log("Successfully deployed token module, address: ", tokenModule.address);
  } catch (error) {
    console.error("Failed to deploy token module", error);
  }
})();