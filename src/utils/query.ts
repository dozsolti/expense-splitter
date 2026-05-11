export function getQueryParams(): Record<string, string | null> {
  const url = new URL(window.location.href);
  const params: Record<string, string | null> = {};
  url.searchParams.forEach((value, key) => {
    if (
      value === "" ||
      value.trim() === "" ||
      value.toLowerCase() === "null" ||
      value.toLowerCase() === "undefined"
    ) {
      params[key] = null;
    } else {
      params[key] = value;
    }
  });
  return params;
}

export function setQueryParams(params: Record<string, string>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  window.history.pushState(null, "", url.toString());
}
