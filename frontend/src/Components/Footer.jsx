import React from "react";

const Footer = () => {
  return (
    <div className="my-8">
      <footer className="bg-white dark:bg-gray-900">
        <div className="container p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <h1 className="text-2xl text-orange-600 font-bold gap-0">
                  open<span className="text-lime-500">library</span>
                </h1>

                <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                  A book library is more than just a repository of knowledge;
                  it's a sanctuary where stories come alive, ideas flourish, and
                  imaginations take flight.
                </p>

                <div className="flex mt-6 -mx-2">
                  <a
                    href="https://www.linkedin.com/in/santosh-sharma-a57026220/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
                    aria-label="LinkedIn"
                    >
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                     <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm8 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.05 0 5.98 3.32 5.98 7.63V24h-5V16.08c0-1.89-.03-4.32-2.63-4.32-2.64 0-3.04 2.06-3.04 4.19V24H8V8z"/>

                    </svg>
                  </a>


                  <a
                    href="https://github.com/Santoshsharm07"
                    className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="Github"
                  >
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

          <div>
            <p className="text-center text-gray-500 dark:text-gray-400">
              ©santoshsharma-All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;