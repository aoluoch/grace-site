export const HELP_KINDS = [
  { value: "counseling", label: "Personal counseling" },
  { value: "marriage_family", label: "Marriage and family" },
  { value: "youth", label: "Youth support" },
  { value: "grief", label: "Grief and loss" },
  { value: "emotional_support", label: "Anxiety and emotional support" },
  { value: "crisis", label: "Crisis support" },
  { value: "other", label: "Something else" },
] as const;

export type HelpKind = (typeof HELP_KINDS)[number]["value"];

export const helpKindLabel = (value?: string) =>
  HELP_KINDS.find((kind) => kind.value === value)?.label ?? value ?? "—";

export const CARE_PHONES = ["0714124065", "0796374792"] as const;
