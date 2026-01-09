import AboutUs from "./AboutUs";
import Blog from "./Blog";
import BookCategories from "./BookCategories";
import BookSuggestions from "./BookSuggestions";
import Carousel from "./Carousel";
import ContactUs from "./ContactUs";
const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <BookCategories></BookCategories>
      <BookSuggestions></BookSuggestions>
      <Blog></Blog>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
