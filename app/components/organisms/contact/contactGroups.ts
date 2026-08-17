import type { CONTACT_FIELDS } from './contactSchema';

type GroupedField = (typeof CONTACT_FIELDS)[number] | 'additionalContext';

/**
 * The five things the brief says a first enquiry must establish, in its own order. The numbers
 * are the form's structure, not decoration — the same index labels a `<fieldset>` and its entry
 * in the rail.
 *
 * The ids are hand-written constants because they are URL fragments; `useId()` emits `«r1»`,
 * which cannot be one.
 */
export const CONTACT_GROUPS = [
  { id: 'enquiry-01', index: '01', step: 'identity', fields: ['name', 'email', 'company', 'role'] },
  { id: 'enquiry-02', index: '02', step: 'property', fields: ['sector', 'scale'] },
  { id: 'enquiry-03', index: '03', step: 'decision', fields: ['decision'] },
  { id: 'enquiry-04', index: '04', step: 'risk', fields: ['incomplete'] },
  { id: 'enquiry-05', index: '05', step: 'timing', fields: ['timing', 'additionalContext'] },
] as const satisfies readonly {
  id: string;
  index: string;
  step: string;
  fields: readonly GroupedField[];
}[];

export const CONTACT_GROUP_IDS = CONTACT_GROUPS.map((group) => group.id);

export type ContactGroupStep = (typeof CONTACT_GROUPS)[number]['step'];

/** A group with its label resolved on the server. */
export type ContactGroup = {
  id: string;
  index: string;
  label: string;
};
