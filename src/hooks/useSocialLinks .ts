// socialLinks.js
import { useEffect, useState } from "react";
import useFetch from "@/hooks/UseFetch";

// Define the types for your settings
type Settings = {
  email: string;
  phone: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  whatsapp: string;
  address: string;
  aboutUs: string;
  aboutUsImage: string;
  privacy: string | null;
};

// Initialize the settings variables
let settings: Settings = {
  email: "",
  phone: "",
  facebookLink: "",
  instagramLink: "",
  linkedinLink: "",
  whatsapp: "",
  address: "",
  aboutUs: "",
  aboutUsImage: "",
  privacy: null,
};

export const useSocialLinks = () => {
  const [links, setLinks] = useState<Settings>(settings);
  const { data, isLoading, error } = useFetch<any>({
    endpoint: "setting",
    queryKey: ["setting"],
  });

  useEffect(() => {
    if (data) {

      const updatedSettings: Settings = {
        //@ts-ignore

        email: data?.data?.email || "",
        //@ts-ignore

        phone: data?.data?.phone || "",
        //@ts-ignore

        facebookLink: data?.data?.fb_link || "",
        //@ts-ignore

        instagramLink: data?.data?.inst_link || "",
        //@ts-ignore

        linkedinLink: data?.data?.linkedin_link || "",
        //@ts-ignore

        whatsapp: data?.data?.whatsapp || "",
        //@ts-ignore

        address: data?.data?.address || "",
        //@ts-ignore

        aboutUs: data?.data?.about_us || "",
        //@ts-ignore

        aboutUsImage: data?.data?.about_us_image || "",
        //@ts-ignore

        privacy: data?.data?.privacy || null,
      };
      settings = updatedSettings;
      setLinks(updatedSettings);
    }
  }, [data]);

  return { links, isLoading, error };
};

export const getFacebookLink = () => settings.facebookLink;
export const getInstagramLink = () => settings.instagramLink;
export const getEmail = () => settings.email;
export const getPhone = () => settings.phone;
export const getLinkedInLink = () => settings.linkedinLink;
export const getWhatsApp = () => settings.whatsapp;
export const getAddress = () => settings.address;
export const getAboutUs = () => settings.aboutUs;
export const getAboutUsImage = () => settings.aboutUsImage;
export const getPrivacy = () => settings.privacy;
