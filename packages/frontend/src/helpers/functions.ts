type ReduceType<T> = (previousValue: T, currentValue: T, currentIndex?: number, array?: T[]) => any

export function propertyReducer<T extends Array<{ [key: string]: any }>>(arr: T) {
  return (property: keyof T[0] & string, callback: ReduceType<T[0]>) =>
    arr.map((t) => t[property]).reduce(callback);
}

export function toPrice(cents: number) {
  return (cents / 100).toFixed(2) + '€'
}
