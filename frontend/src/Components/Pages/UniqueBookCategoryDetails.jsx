import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MyModel from "./MyModel";
import Star from "./Star";

const UniqueBookCategoryDetails = () => {
  const [showModel, setShowModel] = useState(false);
  const uniqueBookDetails = useLoaderData();
  const { name, categories, description, author, rating, image } =
    uniqueBookDetails;

  return (
    <div>
      <section className="p-4 lg:p-8 dark:bg-gray-100 dark:text-gray-800">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="flex flex-col text-left justify-center flex-1 p-6 dark:bg-gray-50"
            >
              <h3 className="text-3xl font-bold">{name}</h3>
              <h4 className="pt-3 text-xl font-medium">{categories}</h4>
              <p className="my-4 dark:text-gray-600 font-medium">
                {description}
              </p>
              <hr />
              <div className="flex justify-between items-center py-5">
                <p className=" font-medium border border-orange-500 rounded-md p-2">
                  Author : {author}
                </p>
                <p className=" font-medium rounded-md p-2">
                  <Star stars={rating}></Star>
                </p>
              </div>
              <div>
                {" "}
                <button
                  disabled={uniqueBookDetails.length === 0}
                  onClick={() => setShowModel(true)}
                  className="p-3 border bg-lime-600 rounded-md text-white font-semibold"
                >
                  Borrow
                </button>
                {showModel && (
                  <MyModel
                    setShowModel={setShowModel}
                    uniqueBookDetails={uniqueBookDetails}
                  ></MyModel>
                )}
              </div>
            </div>
            <img
              data-aos="fade-left"
              data-aos-duration="1000"
              src={image}
              alt=""
              className="h-80 dark:bg-gray-500 aspect-video"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniqueBookCategoryDetails;
