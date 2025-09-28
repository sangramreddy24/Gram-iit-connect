import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';

// Data for the feature cards
const features = [
  {
    title: 'Relatable Mentorship',
    description: 'Connect with successful mentors from your own region and background.',
  },
  {
    title: 'Curated Resources',
    description: 'Access study materials and book lists recommended by those who cleared the exams.',
  },
  {
    title: 'Opportunity Awareness',
    description: 'Discover scholarships and benefits available to you and navigate the application process.',
  },
];

function Home() {
  // Effect to handle scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Cleanup observer on component unmount
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <section className="features-section">
          <h2 className="hidden">How We Help You Succeed</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="hidden" key={index}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;