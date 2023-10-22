import { TFunction } from 'i18next';

export const tArray = <T = string>(
  t: TFunction,
  translationKey: string,
  options = {}
): T[] => {
  const translated = t(translationKey, { ...options, returnObjects: true });
  if (Array.isArray(translated)) {
    return translated as T[];
  }
  return [];
};

export const resolveImageUrl = (imageId: string) => {
  return `${process.env.REACT_APP_API_URL}/images/${imageId}.png`;
};

export const formatDate = (date: Date) => {
  const newDate = new Date(date);

  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = String(newDate.getFullYear()).slice(-2);

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
