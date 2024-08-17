export const convertTo64Base = async (file: File): Promise<string> => {
  const reader = new FileReader();

  const convert = new Promise((res, rej) => {
    reader.onloadend = () => {
      res(null);
    };
    reader.onerror = () => {
      rej();
    };
  });

  reader.readAsDataURL(file);

  await convert;
  const base64String = String(reader.result).replace('data:', '').replace(/^.+,/, '');

  return base64String;
};
