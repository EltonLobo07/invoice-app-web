import type { PAYMENT_TERMS } from "@/constants/general";

export type PaymentTerm = (typeof PAYMENT_TERMS)[number];

export type NextParamsProp = Promise<Record<string, string>>;
