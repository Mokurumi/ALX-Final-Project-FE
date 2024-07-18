'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Update the document title
    document.title = 'Home';

    // check if a user is logged in
    // if not, redirect to login
    // if logged in push to home page

    if (localStorage.getItem('Alxtoken')) {
      window.location.href = '/home';
    } else {
      window.location.href = '/login';
    }
  }, []);

  return <div>{/* <h1>Home</h1> */}</div>;
}
