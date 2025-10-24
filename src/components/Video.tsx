interface VideoProps {
  title: string;
  description: string;
  videoUrl: string;
  blockColourClass?: string;
}

const Video = ({ title, description, videoUrl, blockColourClass }: VideoProps) => {
  return (
    <section className={`video-block w-full pt-10 pb-16 sm:pt-20 sm:pb-24 ${blockColourClass || 'bg-[#FFF4EB]'}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-0">
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
              {title}
            </h2>
          )}
          {description && (
            <div 
              className="text-md text-[#554D77] max-w-2xl mx-auto mb-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>
      
      {videoUrl && (
        <div className="max-w-5xl mx-auto px-8 lg:px-0">
          <div className="video-container relative w-full aspect-video after:content-[''] after:absolute after:w-full after:aspect-video after:bg-gradient-to-br after:from-[#FECBBE] after:to-[#FFA49B] after:left-4 after:top-4 after:rounded-2xl">
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-2xl relative z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title || 'Video content'}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Video;