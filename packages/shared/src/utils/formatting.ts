export const formattedPrice = (price: number) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

export const formattedLicensePlate = (licensePlate: string) => {
  // Remove any existing dashes and convert to uppercase
  const cleaned = licensePlate.replace(/-/g, "").toUpperCase();

  // Define the possible formats for license plates
  const formats = [
    /^(\d{2})([A-Z]{2})([A-Z]{2})$/, // 99-XX-XX
    /^(\d{2})([A-Z]{3})(\d{1})$/, // 99-XXX-9
    /^(\d{1})([A-Z]{3})(\d{2})$/, // 9-XXX-99
    /^([A-Z]{2})(\d{3})([A-Z]{1})$/, // XX-999-X
    /^([A-Z]{1})(\d{3})([A-Z]{2})$/, // X-999-XX
    /^([A-Z]{3})(\d{2})([A-Z]{1})$/, // XXX-99-X
  ];

  // Try to match the cleaned license plate to one of the formats
  for (const format of formats) {
    const match = cleaned.match(format);
    if (match) {
      return match.slice(1).join("-");
    }
  }

  // If no format matches, return the cleaned license plate
  return cleaned;
};

export const formattedMileage = (number: number) => {
  return `${new Intl.NumberFormat("nl-NL").format(number)} KM`;
};

export function formatInitials(name: string): string {
  const nameParts = name.split(" ");
  if (nameParts.length === 0) {
    return "RU";
  }
  if (nameParts.length === 1) {
    return nameParts[0]?.[0]?.toUpperCase() ?? "U";
  }
  // Get the first letter of the first part and the first letter of the last part
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() ?? "U";
  const lastInitial =
    nameParts[nameParts.length - 1]?.[0]?.toUpperCase() ?? "U";
  return firstInitial + lastInitial;
}

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};
