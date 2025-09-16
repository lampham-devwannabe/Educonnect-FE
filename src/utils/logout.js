import { cookies } from 'next/headers';

export async function clearCookies() {
  const cookiesStore = await cookies();
  const allCookies = cookiesStore.getAll();
  
  allCookies.forEach(cookie => {
    cookiesStore.delete(cookie.name);
  });
}

