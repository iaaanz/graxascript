import fs from "fs";
import {
  Token,
  isInt,
  token,
  isAlpha,
  KEYWORDS,
  TokenType,
  isSkippable,
  isBinaryOperator,
} from "token";

const tokenizeRec = (src: string[], tokens: Token[] = []): Token[] => {
  if (src.length === 0) {
    tokens.push({ value: "EndOfFile", type: TokenType.EOF });
    return tokens;
  }

  const char = src.shift()!;

  if (char === "(" || char === ")") {
    const type = char === "(" ? TokenType.OpenParen : TokenType.CloseParen;
    tokens.push(token(char, type));
    return tokenizeRec(src, tokens);
  }

  if (isBinaryOperator(char)) {
    tokens.push(token(char, TokenType.BinaryOperator));
    return tokenizeRec(src, tokens);
  }

  if (char === "=") {
    tokens.push(token(char, TokenType.Equals));
    return tokenizeRec(src, tokens);
  }

  if (isInt(char)) {
    let num = char;
    while (src.length && isInt(src[0])) num += src.shift()!;
    tokens.push(token(num, TokenType.Number));
    return tokenizeRec(src, tokens);
  }

  if (isAlpha(char)) {
    let ident = char;
    while (src.length && isAlpha(src[0])) ident += src.shift()!;
    const reserved = KEYWORDS[ident];
    tokens.push(token(ident, reserved || TokenType.Identifier));
    return tokenizeRec(src, tokens);
  }

  if (isSkippable(char)) return tokenizeRec(src, tokens);

  console.log(`deu graxa: ${char}`);
  return [];
};

export const tokenize = (source: string): Token[] => tokenizeRec(source.split(""));

const source = fs.readFileSync("./test.txt", "utf-8");

console.log(tokenize(source));
