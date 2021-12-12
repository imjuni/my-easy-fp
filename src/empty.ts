export function isUndefined<T>(value?: T | undefined): value is undefined {
  if (value === undefined) {
    return true;
  }

  return false;
}

export function isNotUndefined<T>(value?: T | undefined): value is T {
  return !isUndefined(value);
}

export function isNull<T>(value?: T | null): value is null {
  if (value === null) {
    return true;
  }

  return false;
}

export function isNotNull<T>(value?: T | null): value is T {
  return !isNull(value);
}

export function isNotEmpty<T>(value?: T | undefined | null): value is T {
  return isNotUndefined(value) && isNotNull(value);
}

export function isEmpty<T>(value?: T | undefined | null): value is undefined | null {
  return isUndefined(value) || isNull(value);
}

/**
 * 인자가 빈 값이면 true를 반환한다. 숫자 일 경우에는 NaN 검사, 문자열일 경우에는 빈 문자열 검사,
 * 배열인 경우 길이가 1보다 작은지 검사, 오브젝트인 경우 키가 1개 이상인지 검사하는 추가 검사항목이
 * 포함되어 있다.
 *
 * @param value 빈 값인지 검사하고 싶은 값
 */
export function isComplexEmpty<T>(value?: T | undefined | null): value is null | undefined {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    return true;
  }

  if (typeof value === 'string' && value === '') {
    return true;
  }

  if (typeof value === 'object' && Array.isArray(value) && value.length < 1) {
    return true;
  }

  if (typeof value === 'object' && !(value instanceof Date) && Object.keys(value).length < 1) {
    return true;
  }

  return false;
}

/**
 * 인자가 빈 값이 아니면 true를 반환한다. 숫자 일 경우에는 NaN 검사, 문자열일 경우에는 빈 문자열 검사,
 * 배열인 경우 길이가 1보다 작은지 검사, 오브젝트인 경우 키가 1개 이상인지 검사하는 추가 검사항목이
 * 포함되어 있다.
 *
 * @param value 빈 값 아닌지 검사하고 싶은 값
 */
export function isNotComplexEmpty<T>(value?: T | null | undefined): value is T {
  return !isComplexEmpty<T>(value);
}
