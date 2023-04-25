import { resetHardhatContext } from "hardhat/plugins-testing";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { initZilliqa } from "../src/ScillaContractDeployer";
import * as ZilliqaHardhatObject from "../src/ZilliqaHardhatObject";
import path from "path";

declare module "mocha" {
  interface Context {
    hre: HardhatRuntimeEnvironment;
    zobj: ZilliqaHardhatObject.ZilliqaHardhatObject;
  }
}

export function useEnvironment(fixtureProjectName: string) {
  before("Loading hardhat environment", async function () {
    process.chdir(path.join(__dirname, "fixture-projects", fixtureProjectName));
    this.hre = require("hardhat");
    await initZilliqa(process.env.ZILLIQA_API_URL || this.hre.getNetworkUrl(), this.hre.getZilliqaChainId(),
                      this.hre.getPrivateKeys(), 30);
    this.zobj = this.hre.zilliqa;
    //this.zobj = new ZilliqaHardhatObject.ZilliqaHardhatObject();
  });

  after("Resetting hardhat", function () {
    resetHardhatContext();
  });
}
