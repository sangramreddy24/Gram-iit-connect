import React from 'react';

// Importing all the components for your homepage
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import Footer from '../components/Footer';

// A helper component to display your feature cards
function FeaturesSection() {
  const features = [
    { title: 'Relatable Mentorship', description: 'Guidance from individuals who have successfully navigated the same path.' },
    { title: 'Curated Resources', description: 'Access targeted, affordable, and effective study materials without the noise.' },
    { title: 'Opportunity Awareness', description: 'Understand scholarships, benefits, and alternative career pathways.' }
  ];
  return (
    <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2>How We Help You Succeed</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {features.map(feature => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
}


// This is your main Home page component that assembles everything
function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SuccessStoriesSection />
      <Footer />
    </div>
  );
}

export default Home;