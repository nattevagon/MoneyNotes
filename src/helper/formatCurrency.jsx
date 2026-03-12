export const formatCurrency = (amount) => {
  return 'Rp ' + (amount?.toLocaleString("id-ID") || '0');
};