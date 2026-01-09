import library01 from "../../../public/library-01.jpg";
import library02 from "../../../public/library-02.jpg";
import library03 from "../../../public/library-03.jpg";
import library04 from "../../../public/library-04.jpg";
import library05 from "../../../public/library-05.jpg";
import library06 from "../../../public/library-06.jpg";
import library07 from "../../../public/library-07.jpg";
const Blog = () => {
  return (
    <div className="py-16 bg-white">
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Read Our Latest Blog
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Stay updated with the latest news, trends, and insights from the world of literature
            and library management. Our blog covers a wide range of topics to inspire and inform
            book lovers and library enthusiasts.
          </p>
        </div>
        <div className="container max-w-6xl mx-auto space-y-12">
          {/* Featured Blog Post */}
          <a
            rel="noopener noreferrer"
            href="#"
            className="block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <div className="lg:grid lg:grid-cols-12">
              <img
                src={library01}
                alt="Librarian's Log: Managing the Literary Landscape"
                className="object-cover w-full h-64 sm:h-80 lg:h-96 lg:col-span-7"
              />
              <div className="p-8 lg:col-span-5 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 text-sm font-medium text-lime-600 bg-lime-100 rounded-full mb-4">
                  Library Management
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 hover:text-lime-600 transition-colors">
                  Librarian's Log: Managing the Literary Landscape
                </h3>
                <span className="text-sm text-gray-500 mb-4 block">
                  February 19, 2024
                </span>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Libraries provide access to a vast array of books, journals,
                  magazines, and other resources, democratizing knowledge and
                  information. They serve as repositories of human wisdom,
                  enabling individuals to educate themselves on a wide range of
                  topics regardless of their socioeconomic status....
                </p>
                <span className="inline-flex items-center text-lime-600 font-medium hover:underline">
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
          {/* Blog Grid */}
          <div className="grid justify-center grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: library02, title: "Bookshelf Chronicles: Navigating Library Systems", date: "January 21, 2024", category: "Library Systems" },
              { img: library03, title: "The Library Ledger: Insights into Book Management", date: "January 22, 2024", category: "Book Management" },
              { img: library04, title: "Pages & Pixels: Innovations in Library Technology", date: "January 23, 2024", category: "Technology" },
              { img: library05, title: "Bibliophile's Blueprint: Crafting Library Solutions", date: "March 24, 2024", category: "Design" },
              { img: library06, title: "Shelf Savvy: Strategies for Library Management", date: "May 25, 2024", category: "Management" },
              { img: library07, title: "Reading Room Reflections: Tales from Library Administrators", date: "January 26, 2024", category: "Leadership" }
            ].map((post, index) => (
              <a
                key={index}
                rel="noopener noreferrer"
                href="#"
                className="block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="object-cover w-full h-48"
                />
                <div className="p-6">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-lime-600 bg-lime-100 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 hover:text-lime-600 transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-xs text-gray-500 mb-4 block">
                    {post.date}
                  </span>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    Libraries play a crucial role in promoting literacy, preserving cultural heritage,
                    and fostering community engagement. They provide access to knowledge and resources
                    for people of all ages and backgrounds....
                  </p>
                  <span className="inline-flex items-center text-lime-600 text-sm font-medium hover:underline">
                    Read More
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="flex justify-center">
            <button
              type="button"
              className="px-8 py-3 bg-white text-lime-600 border border-lime-600 font-semibold rounded-lg hover:bg-lime-50 hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Load more posts...
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
