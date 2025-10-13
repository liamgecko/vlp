import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import CarouselSection from "@/components/CarouselSection";
import { TestimonialSection } from "@/components/ScrollRevealText";
import ImageTextCarousel from "@/components/ImageTextCarousel";

export default function About() {
  return (
    <>
      <Hero
        backgroundImage={{
          src: "/vicki.jpg",
          alt: "About Victoria Photography - Vicki the photographer"
        }}
        subtitle="About Victoria Photography"
        heading="Hey, I'm Vicki...your next wedding photographer"
        primaryButton={{
          text: "You're awesome Vic, can we book?",
          link: "/contact#book-consultation",
          ariaLabel: "You're awesome Vic, can we book?"
        }}
        secondaryButton={{
          text: "We wanna know more",
          link: "#about-intro",
          ariaLabel: "We wanna know more"
        }}
      />
      
      <ImageText
        id="about-intro"
        title="Hey, I'm Vicki!"
        description="I'm a Fife-based photographer who's been capturing weddings across Scotland and Europe for over thirteen years. I absolutely love what I do – there's something magical about being part of someone's most important day. My approach is relaxed, fun, and unobtrusive. I want you to feel comfortable and natural, so I can capture the real moments, the genuine emotions, and the spontaneous laughter that make your wedding day uniquely yours."
        imageSrc="/vicki.jpg"
        imageAlt="Victoria Photography - Vicki the photographer"
        variant="right"
        buttonText="We love your style, can we book you?"
        buttonLink="/contact#book-consultation"
        className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
      />
      
      <CarouselSection
        title="Behind the lens"
        description="When I'm not photographing weddings, you'll find me exploring Scotland's beautiful landscapes, spending time with my family, or planning my next adventure. I believe that life's best moments happen when you're not trying too hard – and that's exactly how I approach wedding photography."
        slides={[
          { src: "/vlp-01.jpg", alt: "Behind the scenes - Wedding preparation" },
          { src: "/vlp-02.jpg", alt: "Behind the scenes - Ceremony moment" },
          { src: "/vlp-03.jpg", alt: "Behind the scenes - Reception celebration" },
          { src: "/vlp-04.jpg", alt: "Behind the scenes - Romantic moment" },
          { src: "/vlp-05.jpg", alt: "Behind the scenes - Wedding details" }
        ]}
        options={{ dragFree: true, loop: true }}
        className="bg-transparent"
      />
      
      <ImageText
        title="Why choose me for your wedding?"
        description="With over thirteen years of experience, I've learned that the best wedding photos come from genuine moments, not forced poses. I'm there to capture your story as it unfolds – the nervous excitement, the tears of joy, the spontaneous laughter. My goal is to make you feel comfortable and natural, so when you look back at your photos, you'll see the real you, the real emotions, and the real magic of your special day."
        imageSrc="/vlp-01.jpg"
        imageAlt="Wedding Photography - Beautiful couple moment"
        variant="left"
        buttonText="Ok we're convinced, we want to book!"
        buttonLink="/contact#book-consultation"
        className="bg-sunflower-100"
      />
      
      <TestimonialSection
        heading="What a fantastic photos hoot we had with Victoria. Very nice set up she has and Victoria was so lovely, friendly and professional! Very prompt and we had our lovely pet photos of my Roxy within an hour! They are amazing thank you so much x"
        author="— Emma Bower"
        backgroundImage="/vlp-03.jpg"
        className="bg-gradient-to-b from-orange-50 to-sunflower-100"
      />
      
      <ImageTextCarousel
        slides={[
          {
            imageSrc: '/vlp-01.jpg',
            imageAlt: 'Wedding Photography',
            title: 'It begins before your big day!',
            description: 'I’ll meet you for a coffee to get to know you. I’ll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I’ll also show you my portfolio and answer any questions you have.',
          },
          {
            imageSrc: '/vlp-02.jpg',
            imageAlt: 'Natural Photography',
            title: 'Pre-nuptial photoshoot.',
            description: 'I’ll meet you for a coffee to get to know you. I’ll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I’ll also show you my portfolio and answer any questions you have.',
          },
          {
            imageSrc: '/vlp-03.jpg',
            imageAlt: 'Artistic Photography',
            title: "It's time to say 'I do'.",
            description: 'I’ll be there for the morning preparations, right through to the evening celebrations, capturing every genuine emotion and spontaneous moment. Your wedding day should be enjoyable, not stressful, and I’m here to make that happen.',
          }
        ]}
        autoplay={false}
        autoplayDelay={6000}
        showNavigation={true}
        heading="Carousel about you"
        description="I’ll be there for the morning preparations, right through to the evening celebrations, capturing every genuine emotion and spontaneous moment. Your wedding day should be enjoyable, not stressful, and I’m here to make that happen."
        showHeading={true}
      />
    </>
  );
}
