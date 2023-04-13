import { TOKEN_TYPE_ENUM } from "../../../utils/enum/TokenType";

export const tokenTypeList = [
  {
    label: 'Claim Token',
    value: TOKEN_TYPE_ENUM.CLAIM_TOKEN,
  },
  {
    label: 'Deposit Token',
    value: TOKEN_TYPE_ENUM.DEPOSIT_TOKEN,
  },
  {
    label: 'Deposit Withdraw Token',
    value: TOKEN_TYPE_ENUM.DEPOSIT_WITHDRAW_TOKEN,
  },
  {
    label: 'Withdraw Token',
    value: TOKEN_TYPE_ENUM.WITHDRAW_TOKEN,
  },
];