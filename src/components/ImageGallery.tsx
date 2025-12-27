interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden" style={{ height: '400px' }}>
          <div className="col-span-2 row-span-2 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center text-9xl">
            {images[0]}
          </div>
          {images.slice(1, 5).map((img: string, i: number) => (
            <div key={i} className="bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-6xl">
              {img}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
