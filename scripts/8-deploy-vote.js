import sdk from "./1-initialize-sdk.js"

const appModule = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "SweetCityDAO's Proposals",
      // Location of governance token
      votingTokenAddress: process.env.TOKEN_MODULE_ADDRESS,
      
      // After a proposal is created, when can member start voting?
      // 0 == immediately
      proposalStartWaitTimeInSeconds: 0,

      // How long do members have to vote on a proposal when it's created?
      // Currently set to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 24 * 60 * 60,

      // Minimum % of the governance token must be used in the vote
      votingQuorumFraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // Currently set to 0
      minimumNumberOfTokensNeededToPropose: "0"
    });

    console.log("Successfully deployed vote module, address:", voteModule.address);
  } catch (error) {
    console.error("Failed to deploy vote module", error);
  }
})();