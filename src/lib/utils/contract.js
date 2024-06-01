import Web3 from 'web3';
import loanContractAbi from '../../abi/MortgageServicingARMABI.json';

let web3;
let contract;

if (typeof window !== 'undefined') {
    web3 = new Web3(window.ethereum);
    const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
    contract = new web3.eth.Contract(loanContractAbi, contractAddress);
}

export { web3, contract };