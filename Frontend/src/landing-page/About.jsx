import React from 'react';
import { Zap, Shield, Settings } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col space-y-4">
    <div className="w-12 h-12 rounded bg-pulse-card border border-white/10 flex items-center justify-center">
      <Icon className="text-pulse-green" size={24} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Precision Engineering
        </h2>
        <div className="h-1 w-16 bg-pulse-green mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <FeatureCard 
          icon={Zap}
          title="Zero Latency"
          description="Our execution engine is colocated with major exchanges, ensuring your orders hit the book before the competition."
        />
        <FeatureCard 
          icon={Shield}
          title="Institutional-Grade Security"
          description="Military-grade encryption and cold-storage protocols for every asset. Your wealth is shielded by the best in the industry."
        />
        <FeatureCard 
          icon={Settings}
          title="AI-Driven Insights"
          description="Advanced neural networks scan millions of data points to identify market inefficiencies before they become common knowledge."
        />
      </div>
    </section>
  );
};

export default About;
