import React from "react";
import Hero from "@/components/Hero";

interface ContactPageProps {
  formLink?: string;
  hero?: {
    heroImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    heroHeading?: string;
    heroSubHeading?: string;
    primaryButton?: {
      url: string;
      title: string;
    };
  };
  content?: string;
  contactDetails?: {
    phoneNumber?: string;
    emailAddress?: string;
    address?: string;
  };
}

const ContactPage: React.FC<ContactPageProps> = ({
  formLink,
  hero,
  content,
  contactDetails
}) => {
  
  
  return (
    <>
      <Hero
        heroData={{
          heroHeading: hero?.heroHeading,
          heroSubHeading: hero?.heroSubHeading,
          heroImage: hero?.heroImage,
          primaryButton: hero?.primaryButton ? {
            primaryButtonLink: {
              title: hero.primaryButton.title,
              url: hero.primaryButton.url
            }
          } : undefined
        }}
      />
      
      <section className="w-full py-16 lg:py-24 bg-gradient-to-b from-[#FFF4EB] to-sunflower-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              
              {/* Left Column - Text Content */}
              <div className="space-y-8 lg:col-span-2">
                <div>
                  
                  {content && (
                    <div 
                      className="space-y-6 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}
                </div>
                
                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold text-primary mb-2">Call, text or WhatsApp me on:</p>
                    <p className="text-[#554d77]">
                      {contactDetails?.phoneNumber && (
                        <a 
                          href={`tel:${contactDetails.phoneNumber}`}
                          className="text-[#554d77] hover:underline"
                        >
                          {contactDetails.phoneNumber}
                        </a>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-primary mb-2">Send your carrier pigeon or barbershop quartet to:</p>
                    <p className="text-[#554d77]">{contactDetails?.address}</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-primary mb-2">Email:</p>
                    <p className="text-[#554d77]">
                      {contactDetails?.emailAddress && (
                        <a 
                          href={`mailto:${contactDetails.emailAddress}`}
                          className="text-[#554d77] hover:underline"
                        >
                          {contactDetails.emailAddress}
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Contact Form */}
              <div id="book-consultation" className="relative after:content-[''] after:absolute after:w-full after:h-full after:bg-gradient-to-br after:from-[#FECBBE] after:to-[#FFA49B] after:left-4 after:top-4 after:rounded-2xl lg:col-span-3">
                <div className="bg-white rounded-2xl relative z-10">
                  {/* Studio Ninja Contact Form */}
                  <iframe
                    src={formLink}
                    width="100%"
                    height="638"
                    frameBorder="0"
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
};

export default ContactPage;
