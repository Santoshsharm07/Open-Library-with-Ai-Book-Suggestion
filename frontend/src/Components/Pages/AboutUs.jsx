import mission from "../../../public/mission.jpg";
import philosophy from "../../../public/philosophy.jpg";
const AboutUs = () => {
  return (
    <div className="py-12 bg-white">
      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          About Open Library
        </h2>
        <div className="space-y-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-lime-600">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Open Library, our mission is to make knowledge accessible to everyone,
                everywhere. We believe that books have the power to transform lives,
                and we're committed to creating a welcoming space where people of all
                backgrounds can explore, learn, and grow.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We strive to build a diverse collection that reflects the richness of
                human experience, and to foster a community of lifelong learners
                through engaging programs and services.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={mission}
                alt="Our Mission - Making Knowledge Accessible"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-lime-600">
                Our Philosophy
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that libraries are more than just repositories of books—they
                are community hubs where ideas are shared, connections are made,
                and imaginations are sparked.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our philosophy centers on inclusivity, accessibility, and innovation.
                We're dedicated to adapting to the changing needs of our community
                while staying true to the timeless value of reading and learning.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={philosophy}
                alt="Our Philosophy - Community and Learning"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;