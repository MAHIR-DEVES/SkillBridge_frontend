export const userService = {
  // Accepting the optional cookie string
  getSession: async function (cookieHeader?: string) {
    try {
      let finalCookies = '';

      if (cookieHeader) {
        // Use the cookie
        finalCookies = cookieHeader;
      } else {
        // Fallback
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        finalCookies = cookieStore.toString();
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/get-session`,
        {
          headers: {
            //  forwards
            Cookie: finalCookies,
          },
          cache: 'no-store',
        },
      );

      if (!res.ok) return { data: null, error: { message: 'Unauthorized' } };

      const session = await res.json();
      return { data: session, error: null };
    } catch (err) {
      console.error('Fetch error:', err);
      return { data: null, error: { message: 'Connection failed' } };
    }
  },
};
