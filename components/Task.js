'use client';
import Navbar from '@/components/Navbar';
import moment from 'moment';
import React, { useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  useEffect(() => {
    // Update the document title
    document.title = 'Tasks';

    // check if a user is logged in
    // if not, redirect to login
    // if logged in push to home page

    if (!localStorage.getItem('Alxtoken')) {
      window.location.href = '/login';
    }

    const user = JSON.parse(localStorage.getItem('Alxtoken'));

    fetch('http://localhost:4000/tasks', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          setTasks(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('Alxtoken'));

    const taskName = document.getElementById('taskName').value;
    const taskDetails = document.getElementById('taskDetails').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskDue = document.getElementById('taskDue').value;
    const taskAssignee = document.getElementById('taskAssignee').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskPriority = document.getElementById('taskPriority').value;

    fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        taskName,
        description: taskDetails,
        category: taskCategory,
        dueDate: taskDue,
        assignedTo: taskAssignee,
        taskStatus,
        priority: taskPriority,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Task added successfully');
          window.location.href = '/home/tasks';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePopover = () => {
    document.getElementById('popover').classList.toggle('hidden');
  };

  return (
    <div className="w-full pb-40">
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            {/* <h1 class="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              My Tasks
            </h1> */}
            <div className="flex justify-start">
              <button
                onClick={handlePopover}
                class="text-white justify-end bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                Add Task
              </button>

              <input
                class="w-1/3 border-2 ml-4 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                placeholder="Search Todo By Category"
                id="search"
                aria-label="Search"
              ></input>
            </div>

            {/* <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p> */}
          </div>
          <div class="flex flex-wrap -m-4 gap-2">
            {tasks &&
              tasks.map((task) => (
                <div
                  key={task._id}
                  class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow "
                >
                  <div class="flex justify-end px-4 pt-4">
                    <button
                      id="dropdownButton"
                      onClick={() => {
                        document
                          .getElementById(`${task._id}dropdown`)
                          .classList.toggle('hidden');
                      }}
                      class="inline-block absolute text-gray-500   hover:bg-gray-100   focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
                      type="button"
                    >
                      <span class="sr-only">Open dropdown</span>
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                    </button>

                    <div
                      id={`${task._id}dropdown`}
                      class="z-10 hidden absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                    >
                      <ul class="py-2" aria-labelledby="dropdownButton">
                        <li>
                          <a
                            onClick={() => {
                              document
                                .getElementById(`${task._id}dropdown`)
                                .classList.toggle('hidden');
                            }}
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                          >
                            Edit
                          </a>
                        </li>

                        <li>
                          <a
                            onClick={() => {
                              handleDelete(task._id);
                              document
                                .getElementById(`${task._id}dropdown`)
                                .classList.toggle('hidden');
                            }}
                            href="#"
                            class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 "
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="flex flex-col items-center pb-10">
                    {/* <img
                      class="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src="/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie image"
                    /> */}
                    <h5 class="mb-1 text-xl font-medium text-gray-900 ">
                      {task.taskName}
                    </h5>
                    <span class="text-sm text-gray-500  ">{task.category}</span>
                    <div class="flex mt-4 md:mt-6">
                      {/* <a
                        href="#"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                      >
                        Add friend
                      </a> */}
                      <a
                        href="#"
                        class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100   "
                      >
                        {task.priority}
                      </a>
                    </div>
                  </div>
                </div>

                // <div class="py-8 px-4 lg:w-1/3">
                //   <div class="h-full flex items-start">
                //     <div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                //       <span class="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                //         {moment(task.dueDate).format('MMM')}
                //       </span>
                //       <span class="font-medium text-lg text-gray-800 title-font leading-none">
                //         {moment(task.dueDate).format('DD')}
                //       </span>
                //     </div>
                //     <div class="flex-grow pl-6">
                //       <h2 class="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                //         {task.category} ({task.priority})
                //       </h2>
                //       <h1 class="title-font text-xl font-medium text-gray-900 mb-3">
                //         {task.taskName}
                //       </h1>
                //       <p class="leading-relaxed mb-5">{task.description}</p>
                //       <a class="inline-flex items-center">
                //         <img
                //           alt="blog"
                //           src="https://dummyimage.com/102x102"
                //           class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                //         />
                //         <span class="flex-grow flex flex-col pl-3">
                //           <span class="title-font font-medium text-gray-900">
                //             {task.assignedTo}
                //           </span>
                //         </span>
                //       </a>
                //     </div>
                //   </div>
                // </div>
              ))}
          </div>
        </div>
      </section>

      <div id="popover" class="fixed hidden z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Add Task
                  </h3>
                </div>
              </div>
              <div class="mt-2">
                <form id="form" onSubmit={handleAddTask}>
                  <div>
                    <div>
                      <input
                        type="text"
                        placeholder="Task Name"
                        required
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                        id="taskName"
                        name="taskname"
                      />
                      <label htmlFor="taskname"></label>
                    </div>

                    <div className="mt-2">
                      <textarea
                        placeholder="Task Details"
                        style={{ height: '100px' }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        required
                        id="taskDetails"
                        name="taskdetails"
                      ></textarea>
                      <label htmlFor="taskdetails"></label>
                    </div>

                    <select
                      aria-label="Default select example"
                      id="taskCategory"
                      required
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                      name="taskcategory"
                    >
                      <option disabled selected value="">
                        Task Category
                      </option>
                      <option value="personal">Personal Tasks</option>
                      <option value="work">Work/Professional Tasks</option>
                      <option value="academic">Academic Tasks</option>
                      <option value="health">Health and Fitness Tasks</option>
                      <option value="financial">Financial Tasks</option>

                      <option value="travel">Tasks</option>

                      <option value="others">Miscellaneous/Other Tasks</option>
                    </select>
                    <br />
                    <div className="mt-2">
                      <input
                        type="datetime-local"
                        required
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                        id="taskDue"
                        name="taskdue"
                      />
                      <label htmlFor="taskdue"></label>
                    </div>

                    <div className="my-2">
                      <input
                        type="email"
                        required
                        placeholder="Task Assignee"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                        id="taskAssignee"
                        name="taskassignee"
                      />
                      <label htmlFor="taskassignee"></label>
                    </div>
                    <select
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                      aria-label="Default select example"
                      id="taskStatus"
                      required
                      name="taskstatus"
                    >
                      <option disabled selected value="">
                        Task Status
                      </option>
                      <option value="completed">Completed</option>
                      <option value="active">Currently Working</option>

                      <option value="pending">Not Yet Started</option>
                    </select>
                    <div>
                      <select
                        id="taskPriority"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out mt-2
                      "
                      >
                        <option disabled selected value="">
                          Task Priority
                        </option>
                        <option
                          value="high"
                          style={{ backgroundColor: 'red', color: 'white' }}
                        >
                          High
                        </option>
                        <option
                          value="medium"
                          style={{ backgroundColor: 'orange', color: 'white' }}
                        >
                          Medium
                        </option>
                        <option
                          value="low"
                          style={{ backgroundColor: 'green', color: 'white' }}
                        >
                          Low
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add Task
                    </button>
                    <button
                      type="button"
                      onClick={handlePopover}
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
