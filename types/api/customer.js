export type Customer = {
  id: number,
  createdAt: string,
  disabled: boolean,
  email: string,
  groups: Array<string>,
  isBlacklisted: boolean,
  isGuest: boolean,
  name: string,
  totalSales: number,
  storeCreditTotals: {
    availableBalance: number,
    currentBalance: number,
  },
};
