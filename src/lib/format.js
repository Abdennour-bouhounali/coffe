const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (price) => currencyFormatter.format(price);

export const formatAddress = (address) =>
  `${address.street}, ${address.postcode} ${address.city}`;
