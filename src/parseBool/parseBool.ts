export default function parseBool(value?: unknown): boolean {
  try {
    if (value == null) {
      return false;
    }

    if (value === 'false') {
      return false;
    }

    if (value === 'true') {
      return true;
    }

    if (value === true) {
      return true;
    }

    if (value === false) {
      return false;
    }

    return false;
  } catch {
    return false;
  }
}
