export enum TokenType {
  Let,
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  EOF,
}

export type Token = {
  value: string;
  type: TokenType;
};

// preciso de ideias de keywords unicas aqui graaaaxa
export const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};

export const skippable = [" ", "\n", "\t"];

// operadores tambem (1 eoq 1 = 2 ??????? kkk)
export const binaryOperators = ["+", "-", "*", "/"];

export const isAlpha = (str: string) => str.toUpperCase() !== str.toLowerCase();

export const isSkippable = (str: string) => skippable.includes(str);

export const isBinaryOperator = (str: string) => binaryOperators.includes(str);

export const isInt = (str: string) => {
  const char = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];

  return char >= bounds[0] && char <= bounds[1];
};

export const token = (value: string, type: TokenType): Token => ({ value, type });
