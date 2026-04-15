import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100088590864652",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-current"
      >
        <path d="M13.5 9H16V6h-2.5C10.9 6 9 7.9 9 10.5V13H7v3h2v5h3v-5h2.3l.7-3H12v-2.5c0-.8.7-1.5 1.5-1.5Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@prophetdavidowusu4328",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-current"
      >
        <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2C2 8.9 2 12 2 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8ZM10 15.5V8.5l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/prophdavidowusu/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-current"
      >
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/discover/prophet-david-owusu?lang=en",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-current"
      >
        <path d="M14 3h3.1c.4 1.9 1.8 3.3 3.9 3.7v3.1a7.3 7.3 0 0 1-4-1.3v6.5a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.2a2.8 2.8 0 1 0 1.9 2.6V3Z" />
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1f232c] py-10 text-[#e8e8e8] sm:py-12">
      <div className="mx-auto w-full max-w-280 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 sm:gap-10 md:flex-row md:items-start">
          <div>
            <h3 className="text-[1.55rem] font-semibold leading-tight tracking-[0.01em] text-white sm:text-[1.8rem]">
              GRACE ARENA MINISTRIES
            </h3>

            <div className="mt-4 space-y-2.5 text-[1.02rem] text-[#e3e3e3] sm:text-[1.08rem]">
              <p className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-white" />
                <span>0759 212574</span>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-white" />
                <span>gracearenakenya@gmail.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-white" />
                <span>Bungoma Road, off Baricho Road, Nairobi, Kenya</span>
              </p>
              <p className="text-[#c6a85a]">gracearenaministries.org</p>
            </div>
          </div>

          <div className="md:pt-2">
            <p className="text-[1.2rem] font-medium text-white sm:text-[1.3rem]">
              Follow Us
            </p>
            <div className="mt-3 flex items-center gap-3 text-white">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#485065] text-white transition hover:border-[#c6a85a] hover:text-[#c6a85a]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#3a404d] pt-5 text-center text-[0.94rem] text-[#b8bcc6] sm:mt-10 sm:text-[1rem]">
          <p>© {year} Grace Arena Ministries. All Rights Reserved.</p>
          <p className="mt-2">
            <Link
              to="/privacy-policy"
              className="font-medium text-[#d7dbe4] underline underline-offset-4 transition hover:text-[#c6a85a]"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
