import ImageSlider from './ImageSlider';

const ExampleImageSlider = () => {
  const sampleImages = [
    {
      src: '/vlp-01.jpg',
      alt: 'Wedding Photography',
      title: 'Capturing Love Stories',
      description: 'Every wedding tells a unique story. I specialize in capturing those intimate moments, genuine emotions, and the beautiful chaos that makes your day truly special.'
    },
    {
      src: '/vlp-02.jpg',
      alt: 'Natural Photography',
      title: 'Natural & Authentic',
      description: 'My approach is documentary-style photography that captures the real moments. No forced poses, just authentic emotions and genuine connections.'
    },
    {
      src: '/vlp-03.jpg',
      alt: 'Artistic Photography',
      title: 'Your Story, My Passion',
      description: 'From intimate elopements to grand celebrations, I\'m here to document your love story with creativity, passion, and a touch of artistic flair.'
    },
    {
      src: '/vlp-04.jpg',
      alt: 'Wedding Photography',
      title: 'Beautiful Moments',
      description: 'Every moment is precious. Let me capture the beauty, the joy, and the love that makes your wedding day unforgettable.'
    },
    {
      src: '/vlp-05.jpg',
      alt: 'Wedding Photography',
      title: 'Timeless Memories',
      description: 'Creating timeless memories that you\'ll treasure forever. Your love story deserves to be told beautifully.'
    }
  ];

  return (
    <ImageSlider 
      images={sampleImages}
      autoplay={true}
      autoplayDelay={4000}
      showNavigation={true}
      showPagination={true}
      heading="Beautiful Wedding Photography"
      description="Capturing your special moments with artistry and passion"
    />
  );
};

export default ExampleImageSlider; 