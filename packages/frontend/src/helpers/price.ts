export const stringToInt = (price: String) => parseInt(price.replace(".", ""));
export const intToString = (price: number) => "" + price / 100;
