import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule("0x113Cfcaf6FB6065514837E0a3244A63d4898A771");

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();

    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("Successfully set claim condition!");
  } catch (error) {
    console.log("Failed to set claim condition: ", error);
  }
})()