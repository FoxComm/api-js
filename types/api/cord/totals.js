export type OrderTotals = {
  subTotal: number,
  taxes: number,
  shipping: number,
  adjustments: number,
  total: number,
};

export type CartTotals = OrderTotals & {
  customersExpenses: number,
};
