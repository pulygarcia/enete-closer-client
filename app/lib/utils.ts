import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)
}

const VEHICLE_STATUS_LABELS: Record<string, string> = {
  AVAILABLE: 'Disponible',
  RESERVED: 'Reservado',
  SOLD: 'Vendido',
}

export function statusLabel(status: string) {
  return VEHICLE_STATUS_LABELS[status] ?? status
}

const phone = '5493865230048'
export const whatsappUrl = `https://wa.me/${phone}?text=Hola%2C%20vi%20un%20auto%20en%20ENETE%20y%20quiero%20consultar`
