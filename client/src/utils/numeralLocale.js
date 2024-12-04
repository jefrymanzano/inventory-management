import numeral from "numeral";

// Define a custom locale for PHP (Philippine Peso)
numeral.register("locale", "php", {
  delimiters: {
    thousands: ",",
    decimal: ".",
  },
  abbreviations: {
    thousand: "k",
    million: "m",
    billion: "b",
    trillion: "t",
  },
  ordinal: () => "",
  currency: {
    symbol: "₱",
  },
});

// Set the locale globally
numeral.locale("php");

// Export numeral for reuse
export default numeral;
