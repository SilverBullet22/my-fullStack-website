import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, MapPin, Mail, Phone, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" relative bg-gray-950 text-gray-400 border-t border-gray-800 bg-hero-gradient overflow-hidden">
      <div className="w-full pt-16 pb-8 bg-gradient-to-r from-primary-950/80 to-accent-900/80">
      <div className="container mx-auto px-4">
        <div className="grid container grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* الشعار والوصف */}
          <div className="md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-4 space-x-2"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-accent-500 to-primary-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">مشاريعي</span>
            </motion.div>

            <p className="mb-5 text-[14px] md:text-lg text-gray-400 leading-relaxed">
              بناء مواقع وتطبيقات حديثة بتصميم جميل وتجربة مستخدم مميزة.
            </p>

            {/* أيقونات التواصل */}
            <div className="flex space-x-5 mt-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "https://github.com/SilverBullet22" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="p-2 rounded-full bg-gray-100/10 hover:bg-accent-600/20 text-gray-300 hover:text-accent-400 transition"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-white text-md md:text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { name: "الرئيسية", href: "/" },
                { name: "عنّي", href: "/about" },
                { name: "المشاريع", href: "/projects" },
                { name: "المهارات", href: "/skills" },
                { name: "تواصل معي", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-accent-400 text-[14px] md:text-lg transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-white text-md md:text-lg font-semibold mb-4">معلومات التواصل</h3>
            <ul className="space-y-3 text-[14px] md:text-lg">
              <li className="flex gap-2 items-start">
                <MapPin className="w-5 h-5 mt-1 text-accent-400" />
                <span>اليمن, حضرموت, سيئون, تريس</span>
              </li>
              <li className="flex gap-2 items-start">
                <Mail className="w-5 h-5 mt-1 text-accent-400" />
                <span>moh.mn148bh@gmail.com</span>
              </li>
              <li className="flex gap-2 items-start">
                <Phone className="w-5 h-5 mt-1 text-accent-400" />
                <span style={{direction:"ltr"}}>+967 774 708 627</span>
              </li>
            </ul>
          </div>
        </div>

        {/* الخط السفلي */}
        <div className="border-t border-gray-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
          <div className="mt-3 md:mt-0 space-x-3">
            <a href="#" className="hover:text-accent-400 transition">سياسة الخصوصية</a>
            <span>•</span>
            <a href="#" className="hover:text-accent-400 transition">شروط الاستخدام</a>
          </div>
        </div>
      </div>
       
      </div>
    </footer>
  );
}
