//this composable handles comunication via whatsapp when ask for particular vehicle
export function useWhatsapp(message?: string) {
    const config = useRuntimeConfig()
    const phone = config.public.whatsappPhone ?? '5491100000000'
    const defaultMessage = message ?? 'Hola%2C%20quiero%20consultar%20sobre%20un%20veh%C3%ADculo'
    
    return {
      whatsappUrl: `https://wa.me/${phone}?text=${defaultMessage}`,
      buildUrl: (customMessage: string) => `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`
    }
  }