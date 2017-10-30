## Upgradeable contracts

It does what it says: you can have upgradeable contracts for reasonable price (about 1100 gas per call. it depends on calldatasize and returndatasize). Dispatcher uses new returndatasize and returndatacopy opcodes. So it won't work in pre-byzantium network.
There are some constraints on storage: first should be stored target address. Do not remove storage. You can only add new storage in the new versions of target contracts. Test every upgrade heavily. Also, you should implement changing of target storage if you want to upgrade your contracts.

### Disclaimer

This small library has not been heavily tested. Use it on your own risk.

### Basic Usage

1. Deploy target contract
2. Deploy Dispatcher contract with address of the target as constructor argument.

### Writing compatible contracts

- The first storage slot in the contract will be used to store the address of the `Resolver`. Therefore, you will need to start your contracts with the following line:

Additionally, when you upgrade a contract that has already stored data on the blockchain, you will need to be sure not to change the organization of your contract's storage. You can safely add new storage variables, but do not delete or re-order existing ones. It may also be risky to change the version of the Solidity compiler used, as there is no guarantee the storage layout will remain the same. I hope to release tools to more robustly handle data storage in the near future.