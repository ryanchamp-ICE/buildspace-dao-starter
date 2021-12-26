import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(process.env.TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    console.log("Roles that exist right now:", await tokenModule.getAllRoleMembers());

    // revoke all superpower my wallet had over the ERC-20 contract
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log("Roles after revoking ourselves", await tokenModule.getAllRoleMembers());
    console.log("Successfully revoked our superpowers from the ERC-20 contract");
  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
})();