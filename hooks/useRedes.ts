// lib/hooks/useRedes.ts
import { useState, useEffect } from 'react'
import { getRedes } from '@/services/redesService'
import type { RedSocialSchema } from '@/types/redSocial'

export function useRedes() {
  const [redes, setRedes] = useState<RedSocialSchema[]>([])
  useEffect(() => {
    getRedes()
      .then(res => {
        const data = res.data
        Array.isArray(data) ? setRedes(data) : setRedes([])
      })
      .catch(() => setRedes([]))
  }, [])
  return redes
}
