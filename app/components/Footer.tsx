import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../contstants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links-container">
        <div className="footer__rights">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-[#E0FBFC]">
            2026 Car Showroom. <br />
            All rights reserved ©
          </p>
        </div>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              <ul className="flex flex-col gap-2">
                {link.links.map((item) => (
                  <li
                    key={item.title}
                    className="text-[#E0FBFC] transition-colors duration-200"
                  >
                    <Link href={item.url} className="neon-link">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer__copyrights">
        <p className="text-[#E0FBFC]">
          &copy; 2026 Car Showroom. All rights reserved.
        </p>
        <div className="footer__copyrights-link">
          <Link
            href="/"
            className="neon-link"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="neon-link"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
