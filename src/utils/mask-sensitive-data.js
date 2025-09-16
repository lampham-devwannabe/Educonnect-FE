export const maskSensitiveData = (data) => {
  if (!data || data.length <= 6) return data; // If data is too short, return as is
  const visibleLength = 3; // Number of visible characters at the start and end
  const maskedLength = Math.max(0, data.length - 2 * visibleLength); // Ensure maskedLength is non-negative
  return (
    data.slice(0, visibleLength) +
    "*".repeat(maskedLength) +
    data.slice(-visibleLength)
  );
};

export const maskSensitiveDataNumber = (data) => {
  if (typeof data !== "string" || data.length === 0) return data;

  const visibleCount = Math.max(3, Math.floor(data.length / 3)); // Ensure at least 3 characters are visible
  const maskedCount = data.length - visibleCount;

  if (maskedCount <= 0) return data; // If the string is too short to mask, return as-is

  return data.slice(0, visibleCount) + "*".repeat(maskedCount);
};

export const maskEmail = (email) => {
  if (!email || !email.includes("@")) return email;
  const [localPart, domain] = email.split("@");
  return maskSensitiveData(localPart) + "@" + domain;
};
