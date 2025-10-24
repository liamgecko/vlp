export default function FeedSpringInstagram() {
  return (
    <div 
      feedspring="inst_0HTtTXUF6XLdLLTqOgWhJ" 
      feed-type="dynamic"
      className="grid grid-cols-6 gap-2"
    >
      <div feedspring="post" className="group">
        <a 
          feed-field="link"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img 
              feed-field="img"
              alt="Instagram post"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </a>
      </div>
    </div>
  );
}