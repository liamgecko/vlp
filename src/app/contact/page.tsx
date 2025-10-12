import Hero from "@/components/Hero";

export default function Contact() {
  return (
    <>
      <Hero
        backgroundImage={{
          src: "/vlp-05.jpg",
          alt: "Contact Victoria Photography - Wedding couple moment"
        }}
        subtitle="Get in touch"
        heading="Let's chat about your perfect wedding day"
        primaryButton={{
          text: "Ready to go? Save your date!",
          link: "/contact#book-consultation",
          ariaLabel: "Ready to go? Save your date!"
        }}
        showSecondaryButton={false}
      />
      
      <section id="book-consultation" className="w-full py-20 lg:py-32 bg-gradient-to-b from-[#FFF4EB] to-sunflower-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              
              {/* Left Column - Text Content */}
              <div className="space-y-8 pt-16 lg:col-span-2">
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                    I want to hear from you
                  </h2>
                  
                  <div className="space-y-6 text-[#554d77]">
                    <p>
                      I know I'm not for everyone. I'm way too blunt and honest for my own good. I make more penis references than a urologist. And I am very easily distracted by dogs.
                    </p>
                    
                    <p>
                      But I have a kind heart. I give my <em>absolute all</em> to every one of my couples. And if I do say so myself, I'm pretty fucking talented (there, I've said it).
                    </p>
                    
                    <p>
                      If you love my work and think we might be best friends in the making, I'd be buzzing to hear from you. Get in touch today and let's see if we'll make a good team.
                    </p>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold text-primary mb-2">Call, text or WhatsApp me on:</p>
                    <p className="text-[#554d77]">07842893126</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-primary mb-2">Send your carrier pigeon or barbershop quartet to:</p>
                    <p className="text-[#554d77]">42 Beveridge Road, Kirkcaldy, Fife, KY1 1UR</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-primary mb-2">Email:</p>
                    <p className="text-[#554d77]">info@victoria-photography.co.uk</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Contact Form */}
              <div className="relative after:content-[''] after:absolute after:w-full after:h-full after:bg-gradient-to-br after:from-[#FECBBE] after:to-[#FFA49B] after:left-4 after:top-4 after:rounded-2xl lg:col-span-3">
                <div className="bg-white rounded-2xl relative z-10">
                  {/* <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
                    It's time to start a new adventure together! I can't wait to get to know you!!
                  </h3> */}
                  
                  {/* Studio Ninja Contact Form */}
                    <iframe
                      src="https://app.studioninja.co/contactform/parser/0a800fc9-6ff5-1076-8170-0ba051ca32e4/0a800fc9-6ff5-1076-8170-1a2f58b35885"
                      width="100%"
                      height="638"
                      frameBorder="0"
                      scrolling="no"
                      className="rounded-lg"
                      title="Contact Form"
                    />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
