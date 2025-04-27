"use client"

import { useEffect, useState } from "react"

// Standart breakpoint değerleri
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
}

type DeviceType = "mobile" | "tablet" | "laptop" | "desktop"

/**
 * Ekran boyutlarını izleyen ve breakpoint bilgilerini döndüren hook
 * 
 * @param options.query - Özel medya sorgusu (örn: "(min-width: 768px)")
 * @param options.breakpoint - Kontrol edilecek önceden tanımlanmış breakpoint
 * @param options.type - Sorgu tipi ("max" veya "min")
 * @returns Medya sorgusunun eşleşip eşleşmediği veya cihaz tipi
 * 
 * @example
 * // Boolean değer olarak kullanım
 * const isMobile = useBreakpoint({ breakpoint: "mobile", type: "max" }); // mobile veya daha küçük mü?
 * const isTabletUp = useBreakpoint({ breakpoint: "tablet", type: "min" }); // tablet veya daha büyük mü?
 * 
 * // Özel sorgu ile kullanım
 * const isNarrow = useBreakpoint({ query: "(max-width: 500px)" });
 * 
 * // Cihaz tipi olarak kullanım
 * const deviceType = useBreakpoint(); // "mobile", "tablet", "laptop" veya "desktop" döndürür
 */
export function useBreakpoint(options?: {
  query?: string
  breakpoint?: keyof typeof BREAKPOINTS
  type?: "min" | "max"
}): boolean | DeviceType {
  // Eğer hiçbir parametre verilmezse, cihaz tipini döndüreceğiz
  const returnDeviceType = !options

  // Başlangıç değeri olarak masaüstü veya false
  const [state, setState] = useState<boolean | DeviceType>(returnDeviceType ? "desktop" : false)

  useEffect(() => {
    // Medya sorgusunu oluştur
    let mediaQuery: string
    
    if (options?.query) {
      // Özel sorgu verilmişse onu kullan
      mediaQuery = options.query
    } else if (options?.breakpoint) {
      // Önceden tanımlanmış breakpoint verilmişse onu kullan
      const pixelValue = BREAKPOINTS[options.breakpoint]
      const type = options.type || "max" // Varsayılan olarak max-width
      mediaQuery = `(${type}-width: ${type === "max" ? pixelValue - 1 : pixelValue}px)`
    } else {
      // Hiçbir parametre verilmemişse, cihaz tipini belirlemek için dinleyiciler ekle
      const handleResize = () => {
        const width = window.innerWidth
        let newDeviceType: DeviceType
        
        if (width < BREAKPOINTS.mobile) {
          newDeviceType = "mobile"
        } else if (width < BREAKPOINTS.tablet) {
          newDeviceType = "tablet"
        } else if (width < BREAKPOINTS.laptop) {
          newDeviceType = "laptop"
        } else {
          newDeviceType = "desktop"
        }
        
        setState(newDeviceType)
      }
      
      // İlk çağrı
      handleResize()
      
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }

    // Medya sorgusu için dinleyici
    const mql = window.matchMedia(mediaQuery)
    
    const handleChange = () => {
      setState(mql.matches)
    }
    
    // İlk çağrı
    handleChange()
    
    // Event listener ekle (modern API)
    mql.addEventListener("change", handleChange)
    
    // Cleanup
    return () => mql.removeEventListener("change", handleChange)
  }, [options?.query, options?.breakpoint, options?.type, returnDeviceType])

  return state
}

/**
 * Cihazın mobil olup olmadığını kontrol eden yardımcı hook
 * @returns Cihaz mobil ise true, değilse false
 */
export function useIsMobile(): boolean {
  return useBreakpoint({ breakpoint: "tablet", type: "max" }) as boolean
}

/**
 * Cihazın tablet olup olmadığını kontrol eden yardımcı hook
 * @returns Cihaz tablet ise true, değilse false
 */
export function useIsTablet(): boolean {
  return useBreakpoint({ 
    query: `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.laptop - 1}px)`
  }) as boolean
}

/**
 * Cihaz tipini döndüren yardımcı hook
 * @returns "mobile", "tablet", "laptop" veya "desktop"
 */
export function useDeviceType(): DeviceType {
  return useBreakpoint() as DeviceType
}
