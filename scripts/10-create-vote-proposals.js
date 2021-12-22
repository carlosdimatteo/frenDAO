import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0x5b4007B0728Cf4AaB4CE04ea4Cfd27076fDCfe9F",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x28b69FC75fB502aCB2aa96E9a97BFB1d91B2230b",
);

(async () => {
  try {
    await tokenModule.delegateTo(process.env.WALLET_ADDRESS)
    const amount = 100000;
    // Create proposal to mint 420,000 new token to the treasury.
    await voteModule.propose(
      "Should we use  " + amount + " tokens from the treasury, to execute a Fren Meetup in dubai?",
      [
        {
          // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
          // to send in this proposal. In this case, we're sending 0 ETH.
          // We're just minting new tokens to the treasury. So, set to 0.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a mint! And, we're minting to the voteModule, which is
            // acting as our treasruy.
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          // Our token module that actually executes the mint.
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  // try {
  //   const amount = 6_900;
  //   // Create proposal to transfer ourselves 6,900 token for being awesome.
  //   await voteModule.propose(
  //     "Should the DAO transfer " +
  //     amount + " tokens from the treasury to " +
  //     process.env.WALLET_ADDRESS + " for being awesome?",
  //     [
  //       {
  //         // Again, we're sending ourselves 0 ETH. Just sending our own token.
  //         nativeTokenValue: 0,
  //         transactionData: tokenModule.contract.interface.encodeFunctionData(
  //           // We're doing a transfer from the treasury to our wallet.
  //           "transfer",
  //           [
  //             process.env.WALLET_ADDRESS,
  //             ethers.utils.parseUnits(amount.toString(), 18),
  //           ]
  //         ),

  //         toAddress: tokenModule.address,
  //       },
  //     ]
  //   );

  //   console.log(
  //     "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
  //   );
  // } catch (error) {
  //   console.error("failed to create first proposal", error);
  // }
})();
