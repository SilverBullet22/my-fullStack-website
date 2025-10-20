import React from "react";
import { motion } from "framer-motion";

const FeaturedToggle: React.FC<{
  value: boolean;
  onChange: (next: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      {/* 🔘 الحاوية كلها قابلة للضغط */}
      <label
        htmlFor="featured-toggle"
        className="relative inline-flex items-center cursor-pointer select-none"
        onClick={() => onChange(!value)}
      >
        {/* ✅ input مخفي لكنه يحافظ على الوصول */}
        <input
          id="featured-toggle"
          type="checkbox"
          checked={value}
          readOnly
          className="sr-only"
        />

        {/* ✅ خلفية السويتش */}
        <div
          className={`w-12 h-6 rounded-full p-[3px] flex items-center transition-colors duration-300 ${
            value ? "bg-accent-500" : "bg-gray-300 dark:bg-gray-600"
          }`}
          role="switch"
          aria-checked={value}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange(!value);
            }
          }}
        >
          {/* ✅ الدائرة المتحركة */}
          <motion.div
            animate={{ x: value ? -22 : 0 }}
            transition={{ type: "keyframes", stiffness: 700, damping: 30 }}
            className="w-5 h-5 bg-white rounded-full shadow-md"
          />
        </div>
      </label>

      {/* ✅ الضغط على النص أيضاً يبدّل الحالة */}
      <span
        onClick={() => onChange(!value)}
        className="text-gray-800 dark:text-gray-200 select-none"
      >
        هل تريد أن يكون هذا المشروع مميز؟
      </span>
    </div>
  );
};

export default FeaturedToggle;
