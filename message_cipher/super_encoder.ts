import { caesarCipher, symbolCipher, reverseCipher } from "./encryption";

const encodeMessage = (str: string): string => {
  // Use the encryptor functions here.
  return symbolCipher(caesarCipher(str));
};

const decodeMessage = (str: string): string => {
  // Use the encryptor functions here.
  return symbolCipher(reverseCipher(str));
};

// User input / output.

const handleInput = (userInput: Buffer): void => {
  const message = userInput.toString().trim();
  let output: string | undefined;
  if (process.argv[2] === "encode") {
    output = encodeMessage(message);
  }
  if (process.argv[2] === "decode") {
    output = decodeMessage(message);
  }

  process.stdout.write((output ?? "") + "\n");
  process.exit();
};

// Run the program.
process.stdout.write("Enter the message you would like to encrypt...\n> ");
process.stdin.on("data", handleInput);
