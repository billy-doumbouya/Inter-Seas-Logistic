"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    value: 12,
    suffix: "+",
    labelFr: "Années d'expérience",
    labelEn: "Years of experience",
    color: "text-brand-red",
  },
  {
    value: 500,
    suffix: "+",
    labelFr: "Projets réalisés",
    labelEn: "Completed projects",
    color: "text-white",
  },
  {
    value: 50,
    suffix: "+",
    labelFr: "Clients actifs",
    labelEn: "Active clients",
    color: "text-white",
  },
  {
    value: 5,
    suffix: "",
    labelFr: "Domaines d'activité",
    labelEn: "Areas of expertise",
    color: "text-brand-red",
  },
];

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-brand-blue py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.labelFr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p
                className={`text-4xl md:text-5xl font-display font-bold mb-2 ${stat.color}`}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-brand-gray-400 text-sm font-medium">
                {stat.labelFr}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
