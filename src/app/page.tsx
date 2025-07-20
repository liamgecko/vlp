import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import ImageSlider from "@/components/ImageSlider";
import ImageTextCarousel from "@/components/ImageTextCarousel";
import ScrollSections from "@/components/ScrollSections";
import { Layout484 } from "@/components/ScrollRevealText";
import { Layout357 } from "@/components/AccordionScroll";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import FullWidthImage from "@/components/FullWidthImage";
import LatestWeddings from "@/components/LatestWeddings";


export default function Home() {
  return (
    <>
      <Hero />
      <ImageText
        title="Not your typical wedding photographer!"
        description="Hello, I'm Vicki—a seasoned wedding photographer in Fife but capturing hearts and moments across the world, including, British Columbia, Cyprus, Ibiza, Thailand and beyond. Passionate about nature, dogs, and epic landscapes, I bring a blend of enthusiasm, energy, and a hint of playful innuendo to every wedding. Your wedding day should be a joyous celebration, filled with hugs, dance moves, and romantic moments that feel like a scene out of a fairytale. It’s about enjoying every second with your loved ones, immersed in laughter and love. As your wedding photographer, my goal is to make your special day unforgettable by capturing every genuine emotion and spontaneous moment."
        imageSrc="/vicki.jpg"
        imageAlt="Victoria Photography"
        variant="left"
        buttonText="Learn More"
        buttonLink="/about"
      />
      <ScrollSections />
      <ImageText
        title="Say goodbye to those awkward photos!"
        description="Hello, I'm Vicki—a seasoned wedding photographer in Fife but capturing hearts and moments across the world, including, British Columbia, Cyprus, Ibiza, Thailand and beyond. Passionate about nature, dogs, and epic landscapes, I bring a blend of enthusiasm, energy, and a hint of playful innuendo to every wedding."
        imageSrc="/vicki.jpg"
        imageAlt="Victoria Photography"
        variant="right"
        buttonText="Get Started"
        buttonLink="/contact"
      />
      <div className="w-full py-16 flex justify-center bg-slate-950">
        <div className="w-full max-w-[1600px] mx-auto px-4">
          <ImageSlider 
            images={[
              {
                src: '/vlp-01.jpg',
                alt: 'Wedding Photography'
              },
              {
                src: '/vlp-02.jpg',
                alt: 'Natural Photography'
              },
              {
                src: '/vlp-03.jpg',
                alt: 'Artistic Photography'
              },
              {
                src: '/vlp-04.jpg',
                alt: 'Wedding Photography'
              },
              {
                src: '/vlp-05.jpg',
                alt: 'Wedding Photography'
              }
            ]}
            autoplay={false}
            autoplayDelay={4000}
            showNavigation={true}
          />
        </div>
      </div>
      <Layout484 />
      <ImageTextCarousel
        slides={[
          {
            imageSrc: '/vlp-01.jpg',
            imageAlt: 'Wedding Photography',
            title: 'Capturing Love Stories',
            description: 'Every couple has a unique story to tell. I specialize in capturing the authentic moments, genuine emotions, and beautiful connections that make your love story special.',
          },
          {
            imageSrc: '/vlp-02.jpg',
            imageAlt: 'Natural Photography',
            title: 'Natural & Authentic',
            description: 'Say goodbye to stiff, posed photos. My approach focuses on natural moments, real emotions, and authentic connections that reflect who you truly are.',
          },
          {
            imageSrc: '/vlp-03.jpg',
            imageAlt: 'Artistic Photography',
            title: 'Artistic Excellence',
            description: 'Every image is crafted with artistic vision and technical expertise. From composition to lighting, I ensure each photograph is a work of art.',
          }
        ]}
        autoplay={false}
        autoplayDelay={6000}
        showNavigation={true}
      />
      <Layout357 />
      <FullWidthImage 
        imageSrc="/vlp-05.jpg" 
        imageAlt="Beautiful wedding photography moment"
      />
      <CallToAction />
      <LatestWeddings />
      <Footer />
    </>
  );
}
