export const objectToFormData = (obj: Record<string, string | Blob>) => {
  return Object.entries(obj).reduce((formData, [key, value]) => {
    formData.set(key, value);
    return formData;
  }, new FormData());
};
