// hooks/useExperiencias.ts
import { useState, useEffect } from 'react';
import { Experiencia } from '@/types/experiencia';
import { getExperiencias } from '@/services/experienciaService';  // Usar servicio en lugar de fetch

export function useExperiencias() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

  useEffect(() => {
    getExperiencias()
      .then((data) => setExperiencias(data))
      .catch(() => setExperiencias([]));
  }, []);

  return experiencias;
}
