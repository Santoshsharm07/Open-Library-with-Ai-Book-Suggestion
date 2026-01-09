import callCenter from "../../../public/call_center.jpg";
const ContactUs = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Get in Touch
        </h2>
        <div className="grid max-w-6xl mx-auto gap-10 lg:gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-lime-600">
                Contact Information
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our team is available 24/7 to assist you with any questions or inquiries
                about our library services, collection, or events.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">santosh@openlibrary.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">+91-884489246</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">Gurgaon,Haryana</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src={callCenter}
                alt="Our Support Team"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>
          <div>
            <form noValidate="" className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Send us a message</h3>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-lime-600 text-white font-semibold rounded-lg hover:bg-lime-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
