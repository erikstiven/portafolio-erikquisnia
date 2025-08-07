export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');
  console.log('TOKEN QUE SE ENVÍA', token);

  if (!token || token === "null" || token === "undefined") {
    console.log('NO HAY TOKEN VÁLIDO');
    throw new Error('No hay token válido en localStorage');
  }

  console.log('ANTES DEL FETCH');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/proyectos/upload`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('FETCH HECHO, status', res.status);

  if (!res.ok) throw new Error('Error al subir imagen');
  const data = await res.json();
  return data.url;
};
