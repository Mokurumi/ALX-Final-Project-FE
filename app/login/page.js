'use client';
import React from 'react';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(username, password);

    // login logic here
    fetch('https://alx-final-be.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let token = data.token;

          localStorage.setItem(
            'Alxtoken',
            JSON.stringify({ ...data.user, token }),
          );
          window.location.href = '/home';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 class="title-font font-medium text-3xl text-gray-900">
            Welcome to the Collaborative Task Manager
          </h1>
          <p class="leading-relaxed mt-4">
            The Collaborative Task Manager is your ultimate solution for
            organizing, tracking, and managing tasks efficiently within your
            team. Whether you&lsquo;re working on a small project or managing
            complex workflows, our tool is designed to keep everyone on the same
            page and boost your team&lsquo;s productivity.
          </p>
        </div>
        <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
            Login
          </h2>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Email/Username
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Login
          </button>
          <p class="text-xs text-gray-500 mt-3">
            No account?
            <a href="/signUp" class="text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
