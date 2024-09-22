import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
type ImageSource = string | StaticImageData;

interface ImageGalleryProps {
  title: string;
  breadcrumb: string[];
  mainContent: string;
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  title,
  breadcrumb,
  mainContent,
  images,
}) => {
  const [mainImage, setMainImage] = useState<number>(0);
  const [showAllImages, setShowAllImages] = useState<boolean>(false);

  // Initialize Fancybox
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      Toolbar: false,
      closeButton: "auto", // or use `true` or `false` based on the actual option available
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  const openGallery = () => {
    Fancybox.show(
      images.map((img) => ({
        src: img,
        type: "image",
      }))
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-segoe mb-4">{title}</h1>

      <nav className="mb-4">
        {breadcrumb.map((crumb, index) => (
          <span key={index} className="text-gray-500 font-segoe">
            {crumb}
            {index < breadcrumb.length - 1 && " / "}
          </span>
        ))}
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Thumbnails Column for Larger Screens */}
        <div className="hidden md:flex flex-col w-1/6 space-y-2 pr-2">
          {images.length > 0 && (
            <>
              {/* عرض الصورة الأولى دائمًا */}
              <a href={images[0].toString()} data-fancybox="gallery">
                <Image
                  src={images[0]}
                  alt="First Thumbnail"
                  width={100}
                  height={64}
                  className={`w-full h-16 object-cover rounded-md cursor-pointer ${
                    mainImage === 0 ? "ring-1 ring-yellow-500" : ""
                  }`}
                  onClick={() => setMainImage(0)}
                />
              </a>

              {showAllImages
                ? // عرض جميع الصور إذا تم الضغط على "See More"
                  images.slice(1, -1).map((img, index) => (
                    <a
                      key={index + 1}
                      href={img.toString()}
                      data-fancybox="gallery"
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 2}`}
                        width={100}
                        height={64}
                        className={`w-full h-16 object-cover rounded-md cursor-pointer ${
                          mainImage === index + 1
                            ? "ring-1 ring-yellow-500"
                            : ""
                        }`}
                        onClick={() => setMainImage(index + 1)}
                      />
                    </a>
                  ))
                : images.slice(-3).map((img, index) => (
                    <a
                      key={index + images.length - 3}
                      href={img.toString()}
                      data-fancybox="gallery"
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${images.length - 3 + index + 1}`}
                        width={100}
                        height={64}
                        className={`w-full h-16 object-cover rounded-md cursor-pointer ${
                          mainImage === images.length - 3 + index
                            ? "ring-1 ring-yellow-500"
                            : ""
                        }`}
                        onClick={() => setMainImage(images.length - 3 + index)}
                      />
                    </a>
                  ))}

              <a
                href={images[images.length - 1].toString()}
                data-fancybox="gallery"
              >
                <div className="relative">
                  <Image
                    src={images[images.length - 1]}
                    alt="Last Thumbnail"
                    width={100}
                    height={64}
                    className={`w-full h-16 object-cover rounded-md cursor-pointer ${
                      mainImage === images.length - 1
                        ? "ring-1 ring-yellow-500"
                        : ""
                    }`}
                    onClick={() => setMainImage(images.length - 1)}
                  />
                  {!showAllImages && images.length > 5 && (
                    <div
                      className="absolute font-segoe inset-0 rounded-md cursor-pointer bg-black bg-opacity-50 flex items-center justify-center text-white text-base"
                      onClick={openGallery} // فتح الـ Gallery عند الضغط على "See More"
                    >
                      See More
                    </div>
                  )}
                </div>
              </a>
            </>
          )}
        </div>

        {/* Main Image Container */}
        <div className="w-full md:w-3/4 relative">
          <a
            href={images[mainImage].toString()}
            data-fancybox="gallery"
            className="block w-full"
          >
            <Image
              src={images[mainImage]}
              alt="Main"
              width={1000}
              height={350}
              className="w-full h-[250px] md:h-[350px] object-cover rounded-md"
            />
          </a>
          <button
            onClick={() =>
              setMainImage((prev) => (prev - 1 + images.length) % images.length)
            }
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setMainImage((prev) => (prev + 1) % images.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        className="font-segoe mt-5 text-xl "
        dangerouslySetInnerHTML={{ __html: mainContent }}
      />
    </div>
  );
};

export default ImageGallery;
