import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Slider from "react-slick";

interface ImageGalleryProps {
  title: string;
  breadcrumb: string[];
  mainContent: string;
  images: { url: string }[]; // Ensure images array contains objects with the `url` property
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  title,
  breadcrumb,
  images = [], // Default to an empty array if images are not provided
}) => {
  const [mainImage, setMainImage] = useState<number>(0);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const maxImages = 5; // Limit the number of images displayed

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      Toolbar: false,
      closeButton: "auto",
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  const openGallery = () => {
    Fancybox.show(
      images.map((img) => ({
        src: img.url, // Ensure accessing the correct `url` property here
        type: "image",
      }))
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setMainImage(next);
      setShowSeeMore(next === maxImages - 1); // Update for see more based on the limit
    },
  };

  let slider: any;

  const next = () => {
    if (mainImage === images.length - 1 || showSeeMore) {
      slider.slickGoTo(0); // Go to the first image
      setMainImage(0); // Update the main image index to 0
    } else {
      slider.slickNext();
    }
  };

  const previous = () => {
    if (mainImage === 0) {
      slider.slickGoTo(maxImages - 1);
      setMainImage(maxImages - 1);
    } else {
      slider.slickPrev();
    }
  };

  if (!images || images.length === 0) {
    return <p>No images available</p>; // Handle case when there are no images
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-lg lg:text-2xl font-bold lg:mb-4 mb-2 text-gray-800  pt-3 pl-3 lg:pl-0 lg:pt-0">
        {title}
      </h1>

      <nav className="mb-4 pl-3 lg:pl-0 lg:pt-0">
        {breadcrumb.map((crumb, index) => (
          <span key={index} className="text-gray-500 font-segoe">
            {crumb}
            {index < breadcrumb.length - 1 && " / "}
          </span>
        ))}
      </nav>

      <div className="flex flex-col md:flex-row">
        <div className="hidden md:flex flex-col w-[14%] space-y-2 pr-2">
          {images.length > 0 && (
            <>
              {images.slice(0, maxImages).map((img, index) => (
                <div key={index} className="relative">
                  <a
                    href={img.url} // Access the correct `url` property here
                    data-fancybox="gallery"
                    onClick={(e) => {
                      e.preventDefault();
                      setMainImage(index);
                      slider.slickGoTo(index);
                      setShowSeeMore(index === maxImages - 1);
                    }}
                  >
                    <Image
                      src={img.url} // Access the correct `url` property here
                      alt={`Thumbnail ${index + 1}`}
                      width={100}
                      height={64}
                      className={`w-full h-[72px] object-cover rounded-md hover:brightness-75 ${
                        mainImage === index ? "brightness-110" : "brightness-50"
                      } ${mainImage === index ? "ring-2 ring-black" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          index === maxImages - 1 &&
                          images.length > maxImages
                        ) {
                          openGallery(); // Open gallery if last thumbnail
                        } else {
                          setMainImage(index);
                          slider.slickGoTo(index);
                          setShowSeeMore(index === maxImages - 1);
                        }
                      }}
                    />
                  </a>

                  {index === maxImages - 1 && images.length > maxImages && (
                    <div className="absolute rounded-md inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white overlay cursor-pointer">
                      <span className=" font-medium text-base px-2 py-1  rounded-md">
                        See More
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="w-full md:w-[81%] relative">
          <Slider ref={(c) => (slider = c)} {...settings}>
            {images.slice(0, maxImages).map((img, index) => (
              <div key={index} className="relative rounded-lg">
                <Image
                  src={img.url} // Access the correct `url` property here
                  onClick={index === mainImage ? openGallery : undefined}
                  alt="Main"
                  width={1000}
                  height={350}
                  className="w-full cursor-pointer h-[250px] md:h-[390px] object-cover rounded-md"
                />
                {index === maxImages - 1 && images.length > maxImages && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white overlay">
                    <span
                      onClick={openGallery}
                      className="border-[1.5px] font-segoe text-xl border-white px-10 py-3 rounded-md cursor-pointer hover:bg-white hover:text-black"
                    >
                      See More
                    </span>
                  </div>
                )}
              </div>
            ))}
          </Slider>

          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white"
            onClick={previous}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white"
            onClick={next}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
