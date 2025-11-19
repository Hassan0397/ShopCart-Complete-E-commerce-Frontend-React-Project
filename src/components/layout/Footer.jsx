import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '#' },
        { name: 'Featured', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Bestsellers', href: '#' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', href: '#' },
        { name: 'FAQs', href: '#' },
        { name: 'Shipping Policy', href: '#' },
        { name: 'Returns & Refunds', href: '#' },
      ],
    },
    {
      title: 'About Us',
      links: [
        { name: 'Our Story', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { icon: <FaFacebook size={20} />, href: '#' },
    { icon: <FaTwitter size={20} />, href: '#' },
    { icon: <FaInstagram size={20} />, href: '#' },
    { icon: <FaLinkedin size={20} />, href: '#' },
    { icon: <FaYoutube size={20} />, href: '#' },
  ]

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Newsletter - Enhanced with better spacing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Subscribe to our newsletter</h3>
            <p className="text-gray-600 leading-relaxed">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="flex space-y-2 flex-col">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Links with better spacing */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links with better spacing */}
          <div className="flex items-center space-x-5">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-500 hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                aria-label={`Follow us on ${social.icon.type.name.replace('Fa', '')}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} ShopCart. All rights reserved.
          </p>

          {/* Payment Methods with proper image URLs */}
          <div className="flex items-center space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
              alt="Visa"
              className="h-6 object-contain"
              loading="lazy"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
              alt="Mastercard"
              className="h-6 object-contain"
              loading="lazy"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png"
              alt="PayPal"
              className="h-6 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer