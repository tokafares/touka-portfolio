export const serviceIds = ['landing', 'dashboards', 'ecommerce', 'booking', 'rtl'] as const
export type ServiceId = (typeof serviceIds)[number]
