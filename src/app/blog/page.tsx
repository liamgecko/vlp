import CardGrid from "@/components/CardGrid";
import Hero from "@/components/Hero";

export default function Blog() {
  return (
    <>
      <Hero
        backgroundImage={{
          src: "/vlp-04.jpg",
          alt: "Wedding Photography Blog - Wedding celebration moment"
        }}
        subtitle="Wedding photography blog"
        heading="Stories, tips, and inspiration"
        primaryButton={{
          text: "Read real wedding stories",
          link: "/blog",
          ariaLabel: "Read real wedding stories"
        }}
        showSecondaryButton={false}
      />
      
      <CardGrid
        heading="Latest Blog Posts"
        description="Discover the latest blog posts from Vicki"
        showHeading={true}
        showButton={false}
        className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
      />
    </>
  );
}
