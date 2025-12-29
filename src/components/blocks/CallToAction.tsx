import { getCallToActionFields, CallToActionFields } from '@/lib/wp';
import CallToAction from '@/components/CallToAction';

const CallToActionBlock = async () => {
  // Fetch Call to Action data from WordPress
  const ctaData = await getCallToActionFields();

  // Fallback data if WordPress data is not available
  const fallbackData: CallToActionFields = {
    callToActionHeading: "Ready to capture your special day?",
    callToActionText: "Let's create beautiful memories together. Get in touch to discuss your wedding photography needs and start planning your perfect day.",
    callToActionButton: {
      callToActionButtonText: "Get In Touch",
      callToActionLink: {
        url: "/contact",
        title: "Contact"
      }
    }
  };

  // Use WordPress data if available, otherwise use fallback
  const data = ctaData || fallbackData;

  return (
    <CallToAction
      title={data.callToActionHeading}
      description={data.callToActionText}
      buttonText={data.callToActionButton.callToActionButtonText}
      buttonLink={data.callToActionButton.callToActionLink.url}
    />
  );
};

export default CallToActionBlock;
