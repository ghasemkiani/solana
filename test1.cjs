// Import the Solana web3.js library
const { Connection, PublicKey } = require("@solana/web3.js");

// Replace with the Solana address you want to check
const solanaAddress = "YOUR_SOLANA_ADDRESS";

// Choose the Solana network endpoint (e.g., devnet, mainnet-beta)
const networkEndpoint = "https://api.devnet.solana.com"; // You can change this

async function getSolanaBalance(address) {
  try {
    // Create a connection to the Solana cluster
    const connection = new Connection(networkEndpoint, "confirmed");

    // Convert the address string to a PublicKey object
    const publicKey = new PublicKey(address);

    // Get the balance of the account in lamports
    const balanceInLamports = await connection.getBalance(publicKey);

    // Convert lamports to SOL (1 SOL = 10^9 lamports)
    const balanceInSol = balanceInLamports / 1000000000;

    console.log(`Balance of ${address}: ${balanceInSol} SOL`);
  } catch (error) {
    console.error("Error getting balance:", error);
  }
}

// Call the function to get the balance
getSolanaBalance(solanaAddress);
