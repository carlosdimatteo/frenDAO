import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xf83D8c076573dad3323764ab5B5362B7f7dC3CA7",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Secret FREN Hanshake ",
        description: "Holders are Frens",
        image: readFileSync("scripts/assets/fren.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()