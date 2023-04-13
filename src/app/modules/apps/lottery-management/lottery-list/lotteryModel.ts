export interface LotteryDetails {
  ticketPerUser: number;
  price: number;
  firstPrize: number;
  secondPrize: number;
  thirdPrize: number;
}

export interface LotteryId {
  lotteryId: string;
}

export interface LotteryReward {
  lotteryId: string;
  lotteryType: string;
  lotteryAmount: number;
}
