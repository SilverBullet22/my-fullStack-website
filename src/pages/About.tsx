import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Coffee, Award, Calendar, MapPin } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { category: "الواجهة الأمامية", items: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js"] },
    { category: "الواجهة الخلفية", items: ["Node.js", "Python", "Express", "MongoDB", "PostgreSQL"] },
    { category: "الأدوات", items: ["Git", "Docker", "AWS", "Figma", "Webpack"] },
    { category: "أخرى", items: ["GraphQL", "REST APIs", "الاختبارات", "CI/CD", "Agile"] }
  ];

  const achievements = [
    { icon: Award, title: "أفضل مطور", description: "أفضل أداء في تقييم الشركة السنوي", year: "2023" },
    { icon: Code, title: "مساهم في المصادر المفتوحة", description: "مساهم نشط في أكثر من 15 مشروع", year: "2022" },
    { icon: Palette, title: "تميز في التصميم", description: "شهادة UI/UX من Google", year: "2021" }
  ];

  return (
    <div className="pt-16 overflow-x-hidden">
      {/* قسم البداية */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className=" text-4xl md:text-5xl text-center md:text-right font-bold text-gray-900 dark:text-white mb-6">
                معلومات {' '}
                <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
               عني
                </span>
              </h1>
              <p className="text-md md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                أنا مطور ومصمم متكامل شغوف ولدي أكثر من 5 سنوات من الخبرة في إنشاء حلول رقمية تحدث فرقًا.
                أحب تحويل المشاكل المعقدة إلى تصاميم بسيطة وجميلة وبديهية.
              </p>
              
              <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-accent-500" />
                  <span>اليمن - حضرموت - سيئون</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-accent-500" />
                  <span>متاح للعمل</span>
                </div>
              </div>
            </motion.div>

           <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative w-[90%] max-w-xs sm:max-w-sm md:max-w-md z-10">
                <img
                  src="photo.jpg"
                  alt="image"
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-2xl transform rotate-3" />
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-2xl transform -rotate-3" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* قسم المهارات */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent text-3xl md:text-4xl font-bold  dark:text-white mb-4">
              المهارات والخبرة
            </h2>
            <p className=" text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              أعمل بمجموعة متنوعة من التقنيات لتحقيق الأفكار وتحويلها إلى واقع.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (skillIndex * 0.05) }}
                      className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gradient-to-r hover:from-accent-100 hover:to-primary-100 dark:hover:from-accent-900/20 dark:hover:to-primary-900/20 transition-all duration-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المسيرة المهنية */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent text-3xl md:text-4xl font-bold dark:text-white mb-4">
              مسيرتي
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              من مبتدئ فضولي إلى مطور متمرس، هذه قصتي.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center gap-4 md:gap-6 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="size-12 md:size-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
                      <achievement.icon className="size-6 md:size-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg shadow-gray-300/5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="md:text-xl font-bold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h3>
                      <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 text-sm font-medium rounded-full">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* قسم الحقائق الممتعة */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent text-3xl md:text-4xl font-bold dark:text-white mb-4">
              حقائق ممتعة عني
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center p-8 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl"
            >
              <Coffee className="w-12 h-12 text-accent-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-300">أكواب قهوة أثناء البرمجة</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl"
            >
              <Code className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">50+</h3>
              <p className="text-gray-600 dark:text-gray-300">مشاريع تم إنجازها بنجاح</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center p-8 bg-gradient-to-br from-warning-50 to-accent-50 dark:from-warning-900/20 dark:to-accent-900/20 rounded-xl"
            >
              <Palette className="w-12 h-12 text-warning-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">24/7</h3>
              <p className="text-gray-600 dark:text-gray-300">دائمًا أفكر في التصميم</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
