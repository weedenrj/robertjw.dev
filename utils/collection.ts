import { PartialRecord, RecordKey } from "./record"

type Lit = string | number | boolean | undefined | null | void | {};
export const tuple = <T extends Lit[]>(...args: T) => args;

export function sortInCopy<T>(from: T[], compareFn: (a: T, b: T) => number): T[] {
  return [...from].sort(compareFn)
}

export function reverseInCopy<T>(from: T[]): T[] {
  return [...from].reverse()
}

export function chunk<T>(items: T[], chunkSize: number): T[][] {
  return items.reduce((all, one, i) => {
    const ch = Math.floor(i / chunkSize);

    all[ch] = (all[ch] || []).concat([one])
    return all
  }, [] as T[][])
}

export function chunkBy<T, K>(items: T[], getKey: (item: T, i: number) => K): T[][] {

  const chunks: { key: K, values: T[] }[] = []
  for (let i = 0;i < items.length;i++) {
    const item = items[i]
    if (item === undefined) continue
    const key = getKey(item, i)
    const chunk = chunks.find(({ key: chunkKey }) => chunkKey === key)
    if (!chunk) {
      chunks.push({ key, values: [item] })
    } else {
      chunk.values.push(item)
    }
  }
  return chunks.map(chunk => chunk.values)
}

export function chunkByKeyed<T, K extends RecordKey>(items: T[], getKey: (item: T, i: number) => K): PartialRecord<K, T[]> {
  const chunks: PartialRecord<K, T[]> = {}
  for (let i = 0;i < items.length;i++) {
    const item = items[i]
    if (item === undefined) continue
    const key = getKey(item, i)

    if (!chunks[key]) {
      chunks[key] = []
    }
    const chunk = chunks[key]
    if (chunk) {
      chunk.push(item)
    }
  }
  return chunks
}

export function numberRange(startOrEnd: number, end?: number): number[] {
  const s = typeof end === "number" ? startOrEnd : 0
  const e = typeof end === "number" ? end : startOrEnd

  const range = Array(e - s);

  for (let i = 0;i < range.length;i++) {
    range[i] = i + s
  }

  return range;
}

export function getCircularIndex<T>(array: T[] = [], from: number, dir: "left" | "right"): number {
  if (array.length === 0) return 0
  return dir === "right"
    ? (from + 1) % array.length
    : from === 0 ? array.length - 1 : from - 1
}

export function mkArrayFromRecord<TKey extends string, TValue, TResult>(
  record: PartialRecord<TKey, TValue>,
  callbackFn: (key: TKey, value: TValue, i: number) => TResult,
): TResult[] {
  return Object.entries(record).map(([key, value], i) => {
    return callbackFn(
      typeof key === "string" ? key as TKey : key,
      value as TValue,
      i
    )
  })
}