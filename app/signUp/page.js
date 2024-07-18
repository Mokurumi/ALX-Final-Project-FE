'use client';
import React from 'react';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const c_password = document.getElementById('c_password').value;
    if (password !== c_password) {
      alert('Passwords do not match');
      return;
    }
    console.log(username, email, password);
    fetch('https://alx-final-be.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('User created successfully');
          window.location.href = '/login';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Welcome to the Collaborative Task Manager
          </h1>
          <p className="leading-relaxed mt-4">
            The Collaborative Task Manager is your ultimate solution for
            organizing, tracking, and managing tasks efficiently within your
            team. Whether you&lsquo;re working on a small project or managing
            complex workflows, our tool is designed to keep everyone on the same
            page and boost your team&lsquo;s productivity.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>

          <div className="relative mb-4">
            <label for="full-name" className="leading-7 text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label for="password" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label for="c_password" className="leading-7 text-sm text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="c_password"
              name="c_password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Sign Up
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Already have an account?
            <a href="/login" className="text-indigo-500">
              Log In
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
