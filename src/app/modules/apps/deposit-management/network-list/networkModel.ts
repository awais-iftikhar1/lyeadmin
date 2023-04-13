export interface NetworkDetails {
  chain: string;
  provider: string;
  chainId: string;
  explorerUrl: string;
  nativeCurrency: string;
}

export interface TokenDetails {
  name: string,
  symbol: string,
  logo_url: string,
  network: string,
  address: string,
  decimals: any,
  token_type: string,
}

export interface TokenValues {
  name: string,
  symbol: string,
  decimals: any,
}
