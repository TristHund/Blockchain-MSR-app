# ARM Full Service Blockchain Loan System

Welcome to the ARM Full Service Blockchain Loan System, a decentralized application (dApp) for managing adjustable-rate mortgage (ARM) loans on the blockchain. This system allows borrowers, servicers, and originators to interact with smart contracts for loan origination, payment processing, and interest rate adjustments.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Smart Contracts](#smart-contracts)
- [Frontend](#frontend)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The ARM Full Service Blockchain Loan System leverages blockchain technology to provide a secure and transparent platform for managing ARM loans. This project includes smart contracts written in Solidity and a frontend built with Svelte and SvelteKit, utilizing Web3.js and Ethers.js for blockchain interactions.

## Features

- **Borrower Portal**: Allows borrowers to view their loan details and make payments.
- **Servicer Portal**: Enables servicers to process payments, adjust interest rates, and reset payment statuses.
- **Originator Portal**: Allows originators to originate new loans and view loan details.
- **Blockchain Integration**: Uses smart contracts to handle loan origination, payment processing, and interest rate adjustments.

## Technologies Used

- **Solidity**: For writing smart contracts.
- **Svelte/SvelteKit**: For building the frontend application.
- **Web3.js/Ethers.js**: For interacting with the Ethereum blockchain.
- **Tailwind CSS**: For styling the frontend application.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MetaMask or any other Ethereum wallet installed in your browser

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/arm-blockchain-loan-system.git
   cd arm-blockchain-loan-system
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

## Project Structure

```sh
.
├── abi
│   └── MortgageServicingARMABI.json
├── src
│   ├── lib
│   │   └── index.js
│   ├── routes
│   │   ├── borrower
│   │   │   └── +page.svelte
│   │   ├── originator
│   │   │   └── +page.svelte
│   │   ├── servicer
│   │   │   ├── +layout.svelte
│   │   │   ├── +page.svelte
│   │   │   └── components
│   │   │       ├── AdjustInterestRate.svelte
│   │   │       ├── LoanDetails.svelte
│   │   │       ├── PaymentProcessing.svelte
│   │   │       └── ResetPaymentStatus.svelte
│   ├── app.css
│   ├── app.d.ts
│   ├── app.html
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Smart Contracts

The smart contracts are written in Solidity and are responsible for managing loans. The main contract is `MortgageServicingARM`. You can find the ABI in the `abi` folder and the contract in the [contracts repository](https://github.com/TristHund/Blockchain-MSR-contracts).

## Frontend

The frontend is built with SvelteKit and includes pages for borrowers, servicers, and originators. Each page allows the respective users to interact with the smart contracts.

## How to Use

### Borrower

1. Connect your wallet.
2. Navigate to the Borrower page.
3. View loan details and make payments.

### Servicer

1. Connect your wallet.
2. Navigate to the Servicer page.
3. Search for loans, process payments, adjust interest rates, and reset payment statuses.

### Originator

1. Connect your wallet.
2. Navigate to the Originator page.
3. Originate new loans and view loan details.
