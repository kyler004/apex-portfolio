const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              APEX.
            </div>
            <p className="text-slate-400">
              Creating bold digital experiences for ambitious brands.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Brand Strategy</li>
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Digital Marketing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li>About Us</li>
              <li>Our Work</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>Dribbble</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>© 2026 APEX Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
