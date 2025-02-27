type SortKeywords = [string, string][];
type LabelValuePair = {
  label: string;
  value: string;
};

export const getLabelFromValue = (values: SortKeywords): LabelValuePair[] =>
  values.map(([key, value]) => ({
    label: key.toLowerCase(),
    value,
  }));
