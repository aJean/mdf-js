// src/config/features.js
export const EXPORT_CSV = Symbol('Experimental CSV export.');

export const decisions = {
  [EXPORT_CSV]: true, // Can be set via ENV variables.
};

export function isEnabled(decision: keyof typeof decisions) {
  return decisions[decision];
}