type Addresses = {
  readonly rpc: string;
  readonly pollutionToken: string;
  readonly pollutionMine: string;
};

const mumbai: Addresses = {
  rpc: 'https://rpc-mumbai.maticvigil.com/',
  pollutionToken: '0xa7F2ca10C863663Eb774a5E8CC099e8564a935bc',
  pollutionMine: '0x0de26537011b7A4f5e968b92Ca1F0062AE7b05E8',
};

export default mumbai;
