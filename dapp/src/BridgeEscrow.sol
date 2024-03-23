// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/utils/cryptography/SignatureChecker.sol";
import "openzeppelin-contracts/contracts/utils/math/Math.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract BridgeEscrow is Ownable {
    // Fee for the escrow service
    // Fee out of 100_00
    uint8 public fee = 1_00;
    address public protocolAddress;
    mapping(string => BridgeRequest) public bridgeRequests;
    struct BridgeRequest {
        address sender;
        address token;
        address providerAddress;
        uint256 amount;
        uint256 expiryTime; // 1 hour expiry to escape
        bytes signature;
        bytes32 hash;
    }

    constructor (address _protocolAddress) Ownable(msg.sender) {
        protocolAddress = _protocolAddress;
    }

    function depositBridge(
        string calldata _requestId,
        address _token,
        uint256 _amount,
        address _providerAddress,
        bytes calldata _signature,
        bytes32 _hash
    ) public {
        BridgeRequest memory request = BridgeRequest(msg.sender, _token, _providerAddress, _amount, block.timestamp + 1 hours, _signature, _hash);
        bridgeRequests[_requestId] = request;
    }

    function withdraw(string calldata _requestId) public onlyOwner(){
        BridgeRequest memory request = bridgeRequests[_requestId];
        require(request.expiryTime < block.timestamp, "Request not expired yet");
        
        IERC20 token = IERC20(request.token);
        token.transfer(request.sender, request.amount);

        // Should check for signature and hash not present, indicating already paid out
    }

    // Split funds to the provider and protocol fee
    function executeBridge(string calldata _requestId, bytes calldata _signature, bytes32 _hash) public {
        // Verify signature to ensure that the message was signed by the owner
        require(SignatureChecker.isValidSignatureNow(protocolAddress, _hash, _signature), "Invalid signature");

        BridgeRequest memory request = bridgeRequests[_requestId];
        require(request.sender != address(0), "Request doesn't exist");

        request.signature = _signature;
        request.hash = _hash;
        bridgeRequests[_requestId] = request;

        // Split funds to the provider and protocol fee
        uint256 feeAmount = request.amount * fee / 100;
        uint256 providerAmount = request.amount - feeAmount;

        // Transfer the fee to the protocol
        IERC20 token = IERC20(request.token);
        token.transfer(protocolAddress, feeAmount);
        token.transfer(request.providerAddress, providerAmount);
    }
}
