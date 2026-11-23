import { z } from 'zod';

/** Map units, matching Open GTA 6 Map: a 1024-unit square, y grows downward (south). */
export const MAP_SIZE = 1024;
export const SECTIONS = ['weapons', 'vehicles', 'missions', 'map_pins', 'trophies'] as const;
export type SectionName = (typeof SECTIONS)[number];

const httpsUrl = z.string().url().refine((u) => u.startsWith('https://'), 'must be an https:// link');
const imageRef = z.string().refine((u) => u.startsWith('https://') || /^\/(?!\/)/.test(u), 'must be an https:// link or a /site/path');
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be YYYY-MM-DD');
const bar = z.number().min(0).max(100).nullable();
const amount = z.number().nonnegative().nullable();

export const ConfidenceSchema = z.enum(['confirmed', 'likely', 'unverified']);
export type Confidence = z.infer<typeof ConfidenceSchema>;

export const SourceSchema = z.object({
  url: httpsUrl,
  title: z.string().min(1),
  accessed: isoDate,
});
export type Source = z.infer<typeof SourceSchema>;

export const BaseSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'lowercase letters, digits and dashes only'),
  name: z.string().min(1),
  section: z.enum(SECTIONS),
  summary: z.string().min(1),
  details: z.string().optional(),
  confidence: ConfidenceSchema,
  sources: z.array(SourceSchema).min(1, 'needs at least one source'),
  last_verified: isoDate,
  image: imageRef.optional(),
});
export type Base = z.infer<typeof BaseSchema>;

export const WeaponSchema = BaseSchema.extend({
  section: z.literal('weapons'),
  category: z.string().min(1),
  damage: bar, fire_rate: bar, range: bar, accuracy: bar,
  /** The store menu's Handling bar (0-10 x 10). */
  handling: bar.optional(),
  clip_size: amount, price: amount,
  unlock_how: z.string().nullable(),
});
export type Weapon = z.infer<typeof WeaponSchema>;

export const VehicleSchema = BaseSchema.extend({
  section: z.literal('vehicles'),
  class: z.string().min(1),
  /** Measured top speed. Menu bars are NOT mph, so this stays null until someone tests it. */
  top_speed_mph: amount,
  acceleration: bar, handling: bar, braking: bar,
  /** WAiNK menu bars (0-10 x 10): Speed, Off-road handling, Strength. `handling` is the Asphalt handling bar. */
  speed: bar.optional(), offroad_handling: bar.optional(), strength: bar.optional(),
  seats: amount, price: amount,
  where_to_find: z.string().nullable(),
});
export type Vehicle = z.infer<typeof VehicleSchema>;

export const MissionSchema = BaseSchema.extend({
  section: z.literal('missions'),
  type: z.enum(['story', 'side']),
  order: z.number().int().nonnegative().nullable(),
  giver: z.string().nullable(),
  objective: z.string().min(1).nullable(),
  steps: z.array(z.string()),
  tips: z.array(z.string()),
  missables: z.array(z.string()),
  rewards: z.string().nullable(),
  unlocks: z.array(z.string()),
  chapter: z.number().int().nonnegative().nullable().optional(),
  /** Objective text gives away story; hidden behind a tap. */
  spoiler: z.boolean().optional(),
});
export type Mission = z.infer<typeof MissionSchema>;

export const MapPinSchema = BaseSchema.extend({
  section: z.literal('map_pins'),
  category: z.string().min(1),
  x: z.number().min(0).max(MAP_SIZE),
  y: z.number().min(0).max(MAP_SIZE),
  location_precision: z.enum(['exact', 'approximate', 'unknown']),
  area_name: z.string().nullable(),
  how_to_reach: z.string().nullable(),
  code: z.string().nullable(),
  /** The safe gets a new code each playthrough, so `code` is null and how_to_reach says how to get it. */
  randomized: z.boolean().optional(),
});
export type MapPin = z.infer<typeof MapPinSchema>;

export const TrophySchema = BaseSchema.extend({
  section: z.literal('trophies'),
  how_to_unlock: z.string().min(1),
  missable: z.boolean(),
});
export type Trophy = z.infer<typeof TrophySchema>;

export const CategorySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  collectible: z.boolean(),
});
export type Category = z.infer<typeof CategorySchema>;

export const AreaSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  x: z.number().min(0).max(MAP_SIZE),
  y: z.number().min(0).max(MAP_SIZE),
});
export type Area = z.infer<typeof AreaSchema>;

export const ChangelogEntrySchema = z.object({
  date: isoDate,
  section: z.string().min(1),
  added: z.array(z.string()),
  updated: z.array(z.string()),
});
export type ChangelogEntry = z.infer<typeof ChangelogEntrySchema>;

export const ENTRY_SCHEMAS = {
  weapons: WeaponSchema,
  vehicles: VehicleSchema,
  missions: MissionSchema,
  map_pins: MapPinSchema,
  trophies: TrophySchema,
} as const;

export type AnyEntry = Weapon | Vehicle | Mission | MapPin | Trophy;
