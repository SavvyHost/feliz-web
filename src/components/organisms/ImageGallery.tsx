import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Slider from "react-slick";
import Link from "next/link";

interface TourDetail {
  title: string;
  description: string;
  images: { url: string }[];
  type?: string;
}

interface ImageGalleryProps {
  DetailTour: TourDetail;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ DetailTour }) => {
  const [mainImage, setMainImage] = useState<number>(0);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const maxImages = 5;
  const hasMultipleImages = DetailTour.images.length > 1;

  const breadcrumb = [
    "Home",
    DetailTour.type === "tour_package" ? "Tours Packages" : "Excursions",
    DetailTour.title,
  ];

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      Toolbar: false,
      closeButton: "auto",
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  const openGallery = (
    e?: React.MouseEvent,
    startIndex: number = mainImage
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Only open gallery if we're not dragging
    if (!isDragging) {
      Fancybox.show(
        DetailTour.images.map((img) => ({
          src: img.url,
          type: "image",
        })),
        {
          startIndex: startIndex,
        }
      );
    }
  };

  const settings = {
    dots: false,
    infinite: hasMultipleImages,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setMainImage(next);
      setShowSeeMore(next === maxImages - 1);
    },
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    beforeSlide: () => {
      setIsDragging(true);
    },
    afterSlide: () => {
      // Reset dragging state after a short delay
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    },
  };

  let slider: any;

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    if (
      mainImage === Math.min(DetailTour.images.length, maxImages) - 1 ||
      showSeeMore
    ) {
      slider.slickGoTo(0);
      setMainImage(0);
    } else {
      slider.slickNext();
    }
  };

  const previous = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    if (mainImage === 0) {
      slider.slickGoTo(Math.min(DetailTour.images.length, maxImages) - 1);
      setMainImage(Math.min(DetailTour.images.length, maxImages) - 1);
    } else {
      slider.slickPrev();
    }
  };

  const handleThumbnailClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (index === maxImages - 1 && DetailTour.images.length > maxImages) {
      setMainImage(index);
      slider.slickGoTo(index);
      setShowSeeMore(true);
      openGallery(e, index);
    } else {
      setMainImage(index);
      slider.slickGoTo(index);
      setShowSeeMore(index === maxImages - 1);
    }
  };

  const handleImageClick = (e: React.MouseEvent, index: number) => {
    // Only open gallery if we're not dragging
    if (!isDragging) {
      openGallery(e, index);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  if (!DetailTour.images.length) {
    return (
      <div className="flex flex-col">
        <h1 className="text-lg lg:text-2xl font-bold lg:mb-4 mb-2 text-gray-800 pt-3 pl-3 lg:pl-0 lg:pt-0">
          {DetailTour.title}
        </h1>
        <div className="w-full h-[250px] md:h-[390px] bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-lg lg:text-2xl font-bold lg:mb-4 mb-2 text-gray-800 pt-3 pl-3 lg:pl-0 lg:pt-0">
        {DetailTour.title}
      </h1>

      <nav className="mb-4 pl-3 lg:pl-0 lg:pt-0">
        {breadcrumb.map((crumb, index) => (
          <span key={index} className="text-gray-500 font-segoe">
            {index === 0 ? (
              <Link href="/" className="text-blue-600 hover:underline">
                {crumb}
              </Link>
            ) : index === 1 ? (
              <Link
                href={
                  DetailTour.type === "tour_package"
                    ? "/top-packages"
                    : "/top-excursions"
                }
                className="text-blue-600 hover:underline"
              >
                {crumb}
              </Link>
            ) : (
              crumb
            )}
            {index < breadcrumb.length - 1 && " / "}
          </span>
        ))}
      </nav>

      <div className="flex flex-col md:flex-row">
        {hasMultipleImages && (
          <div className="hidden md:flex flex-col w-[14%] space-y-2 pr-2">
            {DetailTour.images.slice(0, maxImages).map((img, index) => (
              <div key={index} className="relative">
                <div
                  onClick={(e) => handleThumbnailClick(e, index)}
                  className="relative cursor-pointer"
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={64}
                    className={`w-full h-[72px] object-cover rounded-md hover:brightness-75 ${
                      mainImage === index ? "brightness-110" : "brightness-50"
                    } ${mainImage === index ? "ring-2 ring-black" : ""}`}
                  />
                  {index === maxImages - 1 &&
                    DetailTour.images.length > maxImages && (
                      <div
                        className="absolute inset-0 rounded-md flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleThumbnailClick(e, index);
                        }}
                      >
                        <span className="font-medium text-base px-2 py-1 rounded-md">
                          See More
                        </span>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`w-full ${hasMultipleImages ? "md:w-[81%]" : ""} relative`}
        >
          {hasMultipleImages ? (
            <Slider ref={(c) => (slider = c)} {...settings}>
              {DetailTour.images.slice(0, maxImages).map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-lg"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                >
                  <Image
                    src={img.url}
                    onClick={(e) => handleImageClick(e, index)}
                    alt={`Tour image ${index + 1}`}
                    width={1000}
                    height={350}
                    className="w-full cursor-pointer h-[250px] md:h-[390px] object-cover rounded-md"
                  />
                  {index === maxImages - 1 &&
                    DetailTour.images.length > maxImages && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white overlay cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          openGallery(e, index);
                        }}
                      >
                        <span className="border-[1.5px] font-segoe text-xl border-white px-10 py-3 rounded-md hover:bg-white hover:text-black">
                          See More
                        </span>
                      </div>
                    )}
                </div>
              ))}
            </Slider>
          ) : (
            <div
              className="relative rounded-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={DetailTour.images[0].url}
                onClick={(e) => handleImageClick(e, 0)}
                alt="Tour image"
                width={1000}
                height={350}
                className="lg:w-11/12 w-full cursor-pointer h-[250px] md:h-[390px] object-cover rounded-md"
              />
            </div>
          )}

          {hasMultipleImages && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
