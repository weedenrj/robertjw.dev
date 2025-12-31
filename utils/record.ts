export type RecordKey = string | number | symbol;
export type PartialRecord<K extends RecordKey, V> = Partial<Record<K, V>>;

export function recordToArray<TKey extends RecordKey, TValue, TResult>(
  record: PartialRecord<TKey, TValue>,
  callbackFn: (key: string, value: TValue, i: number) => TResult,
): TResult[] {
  return Object.entries(record).map(([key, value], i) => {
    return callbackFn(key, value as TValue, i)
  })
}

export function hasValue<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K) {
  return Object.prototype.hasOwnProperty.call(record, key);
}

export function mkRecordWithDefault<K extends RecordKey, V>(
  record: PartialRecord<K, V>,
  defaultValue: V
) {
  return (key: K) => (record[key] || defaultValue) as V
}

export function mkRecordWithDefaultFnc<K extends RecordKey, V>(
  record: PartialRecord<K, V>,
  defaultFnc: () => V
) {
  return (key: K) => (record[key] || defaultFnc()) as V
}

export function getValueOrDefaultTo<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, defaultValue: V) {
  if (!hasValue(record, key)) {
    record[key] = defaultValue;
  }

  return record[key]
}

export function getValueOrThrow<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, message: string) {
  if (!hasValue(record, key)) {
    throw new Error(message);
  }

  return record[key];
}

export function setValue<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, value: V) {
  record[key] = value;

  return value;
}

export function unsetValue<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K) {
  delete record[key];
}

export function appendToRecordValue<K extends RecordKey, Item>(
  target: Record<K, Item[]>,
  key: K,
  append: Item[],
) {
  target[key] = [...(target[key] || []), ...append]
}

export function mapToPartialRecord<TResult, TKey extends RecordKey, TEntry>(
  record: PartialRecord<TKey, TEntry>,
  callbackFn: (key: TKey, entry: TEntry) => TResult,
): PartialRecord<TKey, TResult> {
  return Object.entries(record).reduce((result, [key, entry]) => {
    if (entry !== undefined) {
      result[key as TKey] = callbackFn(key as TKey, entry as TEntry)
    }
    return result
  }, {} as PartialRecord<TKey, TResult>)
}

export function mapToRecord<TResult, TKey extends RecordKey, TEntry>(
  record: PartialRecord<TKey, TEntry>,
  callbackFn: (key: TKey, entry: TEntry) => TResult,
): Record<TKey, TResult> {
  return Object.entries(record).reduce((result, [key, entry]) => {
    if (entry !== undefined) {
      result[key as TKey] = callbackFn(key as TKey, entry as TEntry)
    }
    return result
  }, {} as Record<TKey, TResult>)
}

export function patchRecord<TKey extends RecordKey, TValue>(
  target: Record<TKey, TValue>,
  patch: Record<TKey, TValue>,
  options = {
    ignoreExisting: false,
    deleteMissing: false,
  }
) {
  let entries = Object.entries(patch) as [TKey, TValue][]

  if (options.ignoreExisting) {
    entries = entries.filter(([key]) => Object.prototype.hasOwnProperty.call(target, key))
  }

  if (options.deleteMissing) {
    Object.keys(target).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(patch, key)) {
        delete target[key as TKey]
      }
    })
  }

  entries.forEach(([key, value]) => target[key] = value)
}
