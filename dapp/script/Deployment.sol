// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Token} from "../src/Token.sol";
import {BridgeEscrow} from "../src/BridgeEscrow.sol";

contract DeploymentScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        Token usdt = new Token("USDT", "USDT");
        Token usdc = new Token("USDC", "USDC");
        Token eth = new Token("ETH", "ETH");
        Token btc = new Token("BTC", "BTC");
        Token bnb = new Token("BNB", "BNB");
        address addr = vm.addr(deployerPrivateKey);
        BridgeEscrow escrow = new BridgeEscrow(addr);
        escrow.depositBridge("e83e7cdc-1159-4c0b-ac2c-5ab0f6f4ab38", address(usdt), 127326e15, addr, "0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b", keccak256(abi.encodePacked("0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b")));
        usdt.transfer(addr, 1000e18);
        usdt.transfer(address(escrow), 1000e18);
        escrow.depositBridge("9c66b184-dad8-4344-8be2-2d0be46e29ae", address(usdc), 117026e15, addr, "0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b", keccak256(abi.encodePacked("0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b")));
        usdc.transfer(addr, 213e18);
        usdc.transfer(address(escrow), 213e18);
        escrow.depositBridge("0596a817-5237-45f8-b53d-d35d16c227d7", address(eth), 12336e15, addr, "0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b", keccak256(abi.encodePacked("0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b")));
        escrow.depositBridge("3d2bc166-76b8-4b47-96d1-48ff2db3b22e", address(btc), 1531326e15, addr, "0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b", keccak256(abi.encodePacked("0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b")));
        eth.transfer(addr, 123e18);
        eth.transfer(address(escrow), 123e18);
        btc.transfer(addr, 271e18);
        btc.transfer(address(escrow), 271e18);
        escrow.depositBridge("2b6b1481-19a0-4c82-9678-526ff2068886", address(bnb), 238326e15, addr, "0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b", keccak256(abi.encodePacked("0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b")));
        bnb.transfer(addr, 182e18);
        bnb.transfer(address(escrow), 182e18);
        escrow.executeBridge("e83e7cdc-1159-4c0b-ac2c-5ab0f6f4ab38", "0xe59d32fe5d063b56e210929e6531f7727c7dcb16149c177116684794e4514c49640aa7ef66fd6393639a542168a37980559450256ec517b5afb8bdf34085457f1c", keccak256(abi.encodePacked("0xe59d32fe5d063b56e210929e6531f7727c7dcb16149c177116684794e4514c49640aa7ef66fd6393639a542168a37980559450256ec517b5afb8bdf34085457f1c")));
        vm.stopBroadcast();
    }
}
