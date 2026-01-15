// Import the functions from encryption.ts here.
import { caesarCipher, symbolCipher, reverseCipher } from "./encryption";

// User Input / Output Logic
/////////////////////////////////////////////

const encryptionMethod = getEncryptionMethod();
process.stdin.on("data", (userInput) => {
  displayEncryptedMessage(encryptionMethod, userInput);
});

/* Helper function for determining which cipher method
the user chose when they ran the program. */
type Encryptor = (input: string) => string;

function getEncryptionMethod(): Encryptor {
  let encryptionMethod: Encryptor;

  const encryptionType = process.argv[2];
  if (encryptionType === "symbol") {
    encryptionMethod = symbolCipher;
  } else if (encryptionType === "reverse") {
    encryptionMethod = reverseCipher;
  } else if (encryptionType === "caesar") {
    let amount = Number(process.argv[3]);
    if (Number.isNaN(amount)) {
      process.stdout.write(`Try again with a valid amount argument. \n`);
      process.exit();
    }
    encryptionMethod = (input) => caesarCipher(input, amount);
  } else {
    process.stdout.write(`Try again with a valid encryption type. \n`);
    process.exit();
  }

  process.stdout.write("Enter the message you would like to encrypt...\n> ");
  return encryptionMethod;
}

/* Helper function for displaying the encrypted message to the user. */
function displayEncryptedMessage(
  encryptionMethod: Encryptor,
  userInput: Buffer,
): void {
  const message = userInput.toString().trim();
  const encryptedMessage = encryptionMethod(message);
  process.stdout.write(
    `\nHere is your encrypted message:\n> ${encryptedMessage}\n`,
  );
  process.exit();
}
