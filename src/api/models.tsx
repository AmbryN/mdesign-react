import { z } from "zod";

const LoginRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginRequest = z.infer<typeof LoginRequestSchema>;

const LoginResponseSchema = z.object({
  id: z.number().optional(),
  username: z.string(),
  roles: z.array(z.string()),
  type: z.string().min(6),
  token: z.string(),
});

type LoginResponse = z.infer<typeof LoginResponseSchema>;

const AddressSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable().optional(),
  number: z.string(),
  street: z.string(),
  postalCode: z.string(),
  city: z.string(),
  type: z.string(),
});

type Address = z.infer<typeof AddressSchema>;

const PersonSchema = z.object({
  id: z.number().optional(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  email: z.string(),
  phone: z.string(),
  address: AddressSchema,
});

type Person = z.infer<typeof PersonSchema>;

const EventTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

type EventType = z.infer<typeof EventTypeSchema>;

const EventSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  type: EventTypeSchema,
  date: z.string(),
  address: AddressSchema,
  soldHours: z.number().min(0),
  startTime: z.string().optional().nullable(),
  endTime: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  contacts: z.array(PersonSchema),
  participants: z.array(PersonSchema),
  hosts: z.array(PersonSchema),
});

type Event = z.infer<typeof EventSchema>;

const MDesignResultSchema = z.object({
  type: z.string(),
  addresses: z.string(),
  events: z.string(),
  dates: z.string(),
  nbEvents: z.number(),
  nbParticipants: z.number(),
  nbMen: z.number(),
  nbWomen: z.number(),
  lowestAge: z.number(),
  highestAge: z.number(),
  soldHours: z.number(),
  executedHours: z.number(),
});

type MDesignResult = z.infer<typeof MDesignResultSchema>;

export {
  AddressSchema,
  PersonSchema,
  EventTypeSchema,
  EventSchema,
  MDesignResultSchema,
  LoginRequestSchema,
  LoginResponseSchema,
};
export type {
  Address,
  Person,
  EventType,
  Event,
  MDesignResult,
  LoginRequest,
  LoginResponse,
};
