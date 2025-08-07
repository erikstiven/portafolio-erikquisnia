import React from 'react';
import type { JSX } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
  FaTelegram,
  FaTiktok,
  FaPinterest
} from 'react-icons/fa';

export const iconMap: Record<string, JSX.Element> = {
 github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  instagram: <FaInstagram />,
  facebook: <FaFacebook />,
  youtube: <FaYoutube />,
  whatsapp: <FaWhatsapp />,
  telegram: <FaTelegram />,
  tiktok: <FaTiktok />,
  pinterest: <FaPinterest />,
};
