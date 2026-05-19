export const LeadStatusEnum = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  LOST: 'LOST',
} as const;

export const LeadSourceEnum = {
  WEBSITE: 'WEBSITE',
  INSTAGRAM: 'INSTAGRAM',
  REFERRAL: 'REFERRAL',
} as const;

export const LeadStatusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  CONTACTED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  QUALIFIED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  LOST: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export const LeadSourceIcons = {
  WEBSITE: '🌐',
  INSTAGRAM: '📸',
  REFERRAL: '🤝',
};

// Export types from enums
export type LeadStatus = keyof typeof LeadStatusEnum;
export type LeadSource = keyof typeof LeadSourceEnum;