export interface PackagesDetails {
  id?: number,
  packageName: string;
  actualPackagePrice: number;
  engines: number;
  currency: string;
  discount: number;
  discountedPackagePrice: number;
  discountExpiresDay: number;

}

export interface PackagesRewardPercent {
  rewardPercentage: string;
  dailyRewardPercentage: string;
}
