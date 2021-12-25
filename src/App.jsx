import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useNemo, useState } from "react";

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule("0x113Cfcaf6FB6065514837E0a3244A63d4898A771");

const App = () => {
  // use the connect wallet hook from thirdweb
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("Address: ", address);

  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }

    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("This user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("This user doesn't have a membership NFT.");
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("Failed to NFT balance", error);
      });
  }, [address]);

  const mintNft = () => {
    setIsClaiming(true);

    bundleDropModule
      .claim("0", 1)
      .then(() => {
        setHasClaimedNFT(true);
        console.log(`Successfully minted! Check it out on Rarible: https://rinkeby.rarible.com/token/${bundleDropModule.address}:0`);
      })
      .catch((err) => {
        console.error("failed to claim", err);
        setIsClaiming(false);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  };


  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to SweetCityDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free SweetCityDAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={() => mintNft()}>
        { isClaiming ? "Minting..." : "Mint your NFT (FREE)" }
      </button>
    </div>
  );
};

export default App;