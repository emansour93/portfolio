import HeroSlider from "../components/HeroSlider";
import Services from "../components/Services";
import FeaturedProjects from "../components/FeaturedProjects";
import WhyChooseUs from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";

export default function Home() {
  return (
    <main style={{ paddingTop: "0px" }}>
      <HeroSlider />
      <Services />
      <FeaturedProjects />
      <WhyChooseUs />
      <CallToAction />
    </main>
  );
}
