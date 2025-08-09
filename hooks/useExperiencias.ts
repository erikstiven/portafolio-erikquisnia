import { useState, useEffect } from 'react'
import type { Experiencia } from '@/types/experiencia'

export function useExperiencias() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experiencias`)
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setExperiencias(data) : setExperiencias([]))
      .catch(() => setExperiencias([]))
  }, [])

  return experiencias
}
