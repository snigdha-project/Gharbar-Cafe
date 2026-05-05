import Hero from "@/components/Home/Hero";
import AboutUs from "@/components/Home/AboutUs";
import FeaturedRooms from "@/components/Home/FeaturedRooms";
import ExclusiveServices from "@/components/Home/ExclusiveServices";
import CTABanner from "@/components/Home/CTABanner";
import Testimonials from "@/components/Home/Testimonials";
import LatestNews from "@/components/Home/LatestNews";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <FeaturedRooms />
      <ExclusiveServices />
      <CTABanner />
      <Testimonials />
      <LatestNews />
    </>
  );
}
