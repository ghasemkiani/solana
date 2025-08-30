import { SysPass } from "../pass/index.js";

const pass = await SysPass.toGetPass();
const key = pass.get("wallet/g/main/solana/key");
// console.log({ key });

import { createSolanaRpc } from "@solana/kit";
import { createKeyPairSignerFromBytes, pipe, createTransactionMessage, appendTransactionMessageInstructions, setTransactionMessageFeePayerSigner, setTransactionMessageLifetimeUsingBlockhash, signTransactionMessageWithSigners } from "@solana/kit";
import { address } from "@solana/kit"; // Assuming @solana/keys is part of kit exports
import { getBase58Decoder } from "@solana/codecs-strings"; // Assuming @solana/keys is part of kit exports
import { getTransferSolInstruction } from "@solana-program/system";
import { findAssociatedTokenPda, fetchToken, fetchMint, getTransferCheckedInstruction, TOKEN_PROGRAM_ADDRESS } from "@solana-program/token";

// Configuration - Replace with your values
const rpcUrl = 'https://api.devnet.solana.com'; // Use devnet for testing
const privateKeyBase58 = key; // WARNING: Use a test wallet only!
const tokenMintBase58 = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // Example: USDC on devnet/mainnet, replace as needed
const destinationAddressBase58 = '5oSgMRfCWtuYoyLVwJWiq86fuRdH2S32jYWpxJvgjYT5'; // Base58 address to send to
const solAmountToSend = 1000000n; // 0.001 SOL in lamports
const tokenAmountToSend = 10000n; // 0.01 USDC (assuming 6 decimals), adjust based on token

// Create RPC client
const rpc = createSolanaRpc(rpcUrl);

// Create signer from private key
const privateKeyBytes = getBase58Decoder().decode(privateKeyBase58);
console.log({ privateKeyBytes });
const signer = await createKeyPairSignerFromBytes(privateKeyBytes);
const myAddress = signer.address;
console.log('Your address:', myAddress);

// Get SOL balance
const { value: solBalance } = await rpc.getBalance(myAddress).send();
console.log('SOL balance (lamports):', solBalance);

// Get token balance
const mintAddress = address(tokenMintBase58);
const [myAta] = await findAssociatedTokenPda({
  mint: mintAddress,
  owner: myAddress,
  tokenProgram: TOKEN_PROGRAM_ADDRESS,
});
let tokenBalance = 0n;
try {
  const tokenAccount = await fetchToken(rpc, myAta);
  tokenBalance = tokenAccount.amount;
} catch (e) {
  console.log('No token account found or balance is 0');
}
console.log('Token balance:', tokenBalance);

// Send SOL
const destinationAddress = address(destinationAddressBase58);
const solTransferInstruction = getTransferSolInstruction({
  source: myAddress,
  destination: destinationAddress,
  amount: solAmountToSend,
});

const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

let txMessage = pipe(
  createTransactionMessage({ version: 0 }),
  (tx) => appendTransactionMessageInstructions([solTransferInstruction], tx),
  (tx) => setTransactionMessageFeePayerSigner(signer, tx),
  (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx)
);

const signedSolTx = await signTransactionMessageWithSigners(txMessage);
const solSignature = await rpc.sendTransaction(signedSolTx).send();
await rpc.confirmTransaction(solSignature).send();
console.log('SOL transfer signature:', solSignature);

// Send token
const [destinationAta] = await findAssociatedTokenPda({
  mint: mintAddress,
  owner: destinationAddress,
  tokenProgram: TOKEN_PROGRAM_ADDRESS,
});

const mintInfo = await fetchMint(rpc, mintAddress);
const decimals = mintInfo.decimals;

const tokenTransferInstruction = getTransferCheckedInstruction({
  source: myAta,
  mint: mintAddress,
  destination: destinationAta,
  authority: myAddress,
  amount: tokenAmountToSend,
  decimals,
});

txMessage = pipe(
  createTransactionMessage({ version: 0 }),
  (tx) => appendTransactionMessageInstructions([tokenTransferInstruction], tx),
  (tx) => setTransactionMessageFeePayerSigner(signer, tx),
  (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx)
);

const signedTokenTx = await signTransactionMessageWithSigners(txMessage);
const tokenSignature = await rpc.sendTransaction(signedTokenTx).send();
await rpc.confirmTransaction(tokenSignature).send();
console.log('Token transfer signature:', tokenSignature);
