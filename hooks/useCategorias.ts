import { useState, useEffect } from 'react'
import type { Categoria } from '@/types/categoria'

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categorias`)
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setCategorias(data) : setCategorias([]))
      .catch(() => setCategorias([]))
  }, [])
  return categorias
}
