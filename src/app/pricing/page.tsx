import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import PricingBlock from "@/components/PricingBlock";
import { TestimonialSection } from "@/components/ScrollRevealText";

export default function Pricing() {
  return (
    <>
      <Hero
        backgroundImage={{
          src: "/vlp-02.jpg",
          alt: "Wedding Photography Pricing - Beautiful wedding moment"
        }}
        subtitle="Wedding photography pricing"
        heading="Investment in your perfect day"
        primaryButton={{
          text: "I've seen enough, let me book!",
          link: "/contact#book-consultation",
          ariaLabel: "Book your wedding photography"
        }}
        secondaryButton={{
          text: "Let's talk money",
          link: "#pricing-table",
          ariaLabel: "Let's talk money"
        }}
      />
      
      <ImageText
        title="Ok, now for the awkward bit..."
        description="You wanna know what you're getting for your money? Well, here you go!  I have a very simple pricing structure based around full day coverage. I like to tell the story of your day in full, so I start with morning prep, and I shoot right through until after your first dance (if you're having one of course). However, if you require a half day or a more bespoke quote due to the nature of your wedding, please don't hesitate to contact me and we can chat."
        imageSrc="/vlp-01.jpg"
        imageAlt="Wedding Photography Pricing - Couple portrait"
        variant="right"
        buttonText="Ok, so how much?"
        buttonLink="#pricing-table"
        className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
      />
      
      <PricingBlock
        id="pricing-table"
        title="Let's talk money..."
        description="Transparent pricing with no hidden fees. Every package includes everything you need for your perfect wedding day."
        tiers={[
          {
            id: "half-day",
            name: "Half Day",
            price: "£800",
            period: "per wedding",
            description: "Perfect for intimate ceremonies and smaller celebrations that don't need full day coverage.",
            features: [
              "4 hours of beautiful photography coverage",
              "Up to 200 carefully edited photos",
              "Private online gallery to share with family",
              "USB with all high-resolution images",
              "Pre-wedding consultation to plan your day",
              "Same-day preview to get excited about your photos"
            ],
            buttonText: "Enquire about this package",
            buttonLink: "/contact#book-consultation"
          },
          {
            id: "full-day",
            name: "Full Day",
            price: "£1,200",
            period: "per wedding",
            description: "Complete coverage from morning prep to first dance - everything you need for your perfect day.",
            features: [
              "8+ hours of comprehensive coverage",
              "Up to 400 beautifully edited photos",
              "Private online gallery to share with family",
              "USB with all high-resolution images",
              "Pre-wedding consultation to plan your day",
              "Same-day preview to get excited about your photos",
              "Engagement shoot included to get comfortable",
              "Full print release for your memories"
            ],
            buttonText: "Enquire about this package",
            buttonLink: "/contact#book-consultation",
            featured: true
          }
        ]}
        className="bg-blush-300"
      />
      
      <TestimonialSection
        heading="We couldn't recommend or thank her enough for her amazing work that she does! From making us feel super comfortable in front of the camera and putting up with our awkwardness, everyone who has seen the photos have thought they were amazing."
        author="— Sarah & James"
        backgroundImage="/vlp-01.jpg"
      />
      
    </>
  );
}
