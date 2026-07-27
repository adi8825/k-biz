export type FilterCategory = "nationality" | "language" | "formation" | "status" | "type";

/** Each category holds the set of selected exact dataset values. An empty
 * set means "no restriction" for that category (matches everything). */
export type FilterState = Record<FilterCategory, ReadonlySet<string>>;

export const EMPTY_FILTER_STATE: FilterState = {
  nationality: new Set(),
  language: new Set(),
  formation: new Set(),
  status: new Set(),
  type: new Set(),
};

/** Returns a new FilterState with `value` toggled on/off within `category`.
 * Never mutates the input. */
export function toggleFilterValue(
  state: FilterState,
  category: FilterCategory,
  value: string,
): FilterState {
  const current = state[category];
  const next = new Set(current);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return { ...state, [category]: next };
}

/** Clears every selection in a single category. */
export function resetFilterCategory(state: FilterState, category: FilterCategory): FilterState {
  return { ...state, [category]: new Set() };
}

/** Clears every category. */
export function resetAllFilters(): FilterState {
  return EMPTY_FILTER_STATE;
}
