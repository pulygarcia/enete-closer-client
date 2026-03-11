import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)
}

const phone = '5493815429673'
export const whatsappUrl = `https://wa.me/${phone}?text=Hola%2C%20vi%20un%20auto%20en%20ENETE%20y%20quiero%20consultar`
