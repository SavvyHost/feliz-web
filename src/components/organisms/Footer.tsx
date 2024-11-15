import Image from "next/image";
import React from "react";
import LOGO from "../../../public/assets/felizlogo.png";
import Link from "next/link";
import useFetch from "@/hooks/UseFetch";
import { Facebook, Linkedin, TwitterIcon } from "lucide-react";
import { Twitter } from "@mui/icons-material";

type Props = {};

const Footer = (props: Props) => {
  const { data, isLoading, failureReason } = useFetch<any>({
    queryKey: ["settings?collection=contact"],
    endpoint: `settings?collection=contact`,
  });

  return (
    <footer className="bg-white border-t border border-gray-200 p-5 font-[sans-serif] ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex justify-center items-center text-black">
          <Link href="/" className="inline-block">
            <Image src={LOGO} alt="Logo" />
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center text-center text-black">
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-1">
            <li>
              <a
                href={`mailto:${data?.data[3]?.value?.email}`}
                className="text-gray-500 hover:text-black text-sm"
              >
                Email: {data?.data[3]?.value?.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${data?.data[3]?.value?.phone}`}
                className="text-gray-500 hover:text-black text-sm"
              >
                Phone: {data?.data[3]?.value?.phone}
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-500 hover:text-black text-sm"
              >
                Address: {data?.data[3]?.value?.address}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${data?.data[3]?.value?.whatsApp}`}
                className="text-gray-500 hover:text-black text-sm"
              >
                WhatsApp: {data?.data[3]?.value?.whatsApp}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center items-center text-center text-black">
          <h4 className="text-lg font-semibold mb-6">Information</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/terms" className="text-gray-400 text-base">
                Terms Condition
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 text-base">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 text-base">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 text-base">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-400 text-base">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center">
          <ul className="flex space-x-6">
            <li>
              <Facebook
                color="black"
                className="cursor-pointer hover:text-gray-200"
              />
            </li>
            <li>
              <Linkedin
                color="black"
                className="cursor-pointer hover:text-gray-200"
              />
            </li>
            <li>
              <TwitterIcon
                color="black"
                className="cursor-pointer hover:text-gray-200"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p
          className="text-gray-500 text-sm mb-4"
          dangerouslySetInnerHTML={{ __html: data?.data[3]?.value?.footerDesc }}
        />
      </div>
      <p className="text-gray-500 text-sm mt-10 text-center">
        © Feliz Tour Egypt. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
