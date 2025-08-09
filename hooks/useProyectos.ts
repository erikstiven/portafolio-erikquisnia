import { useState, useEffect } from 'react'
import type { Proyecto } from '@/types/proyecto'

export function useProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proyectos`)
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setProyectos(data) : setProyectos([]))
      .catch(() => setProyectos([]))
  }, [])
  return proyectos
}
