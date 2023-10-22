import { v4 as uuidv4 } from 'uuid';

export const resolveImgUrl = (imageHash: string) => {
  return `${process.env.IMAGE_CDN_BASE_URL}${imageHash}.png`;
};

export const getRandomAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  return `avatar-${randomNumber}`;
};

export const genShortUUID = () => {
  const uuid = uuidv4().slice(0, 8);
  return uuid;
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};
