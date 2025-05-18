import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Wand2, Database, BarChart3, Sparkles, Mic2, Twitter, Instagram, Facebook, ChevronDown, ArrowRight, CheckCircle2, Users2, Gauge } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 relative">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-serif text-purple-900 leading-tight mb-8">
              Unlock the Power of <span className="italic">Sign Language</span> with Handsy
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Instantly convert text into 3D sign animations with AI-driven precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/converter"
                className="bg-purple-700 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-800 transition flex items-center justify-center space-x-2"
              >
                <Wand2 className="w-5 h-5" />
                <span>Try Handsy Now</span>
              </Link>
              <Link
                to="/learn"
                className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition flex items-center justify-center space-x-2"
              >
                <Box className="w-5 h-5" />
                <span>Learn Sign Language</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">200K+ Signs at Your Fingertips</h3>
              <p className="text-gray-600">Huge database, seamless communication.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Precision in Motion</h3>
              <p className="text-gray-600">Achieve accurate, seamless and precise sign language translations every time.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">High-Quality Visuals</h3>
              <p className="text-gray-600">Crisp, clear sign representations with smooth animations for easy understanding.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Mic2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Voice-to-Sign Conversion</h3>
              <p className="text-gray-600">Simply speak, and Handsy translates it into sign language instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-purple-900 mb-4">Pricing plans</h2>
            <p className="text-gray-600">Our pricing is transparent and fair, with no hidden costs—upgrade anytime for more features.</p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <button className="text-purple-600 border-b-2 border-purple-600 px-4 py-2">Monthly</button>
            <button className="text-gray-600 px-4 py-2">Yearly</button>
            <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm">30% off</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="text-4xl font-bold mb-6">₹49<span className="text-base font-normal text-gray-600">/user</span></div>
              <Link
                to="/converter"
                className="block w-full py-3 px-6 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition mb-8 text-center"
              >
                Get Started For Free
              </Link>
              <p className="font-medium mb-6">Essentials simplified</p>
              <ul className="space-y-4">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-purple-600 mr-3" />Essential hand gesture recognition</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-purple-600 mr-3" />Standard accuracy & speed</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-purple-600 mr-3" />Basic support</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-purple-600 mr-3" />Works on web & mobile</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-purple-600 rounded-2xl p-8 text-white transform scale-105">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">Pro</h3>
                <span className="bg-purple-400 text-white px-3 py-1 rounded-full text-sm">Popular</span>
              </div>
              <div className="text-4xl font-bold mb-6">₹99<span className="text-base font-normal opacity-80">/user</span></div>
              <Link
                to="/converter"
                className="block w-full py-3 px-6 rounded-full bg-white text-purple-600 hover:bg-purple-50 transition mb-8 text-center"
              >
                Get Started For Free
              </Link>
              <p className="font-medium mb-6">Everything in Basic plan</p>
              <ul className="space-y-4">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />Integrations with 3rd-party</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />Advanced analytics</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />Improved accuracy</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />AI-powered gesture customization</li>
              </ul>
            </div>

            {/* Ultimate Plan */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Ultimate</h3>
              <div className="text-4xl font-bold mb-6">₹169<span className="text-base font-normal opacity-80">/user/month</span></div>
              <Link
                to="/converter"
                className="block w-full py-3 px-6 rounded-full bg-white text-gray-900 hover:bg-gray-50 transition mb-8 text-center"
              >
                Get Started For Free
              </Link>
              <p className="font-medium mb-6">Everything in Pro plan</p>
              <ul className="space-y-4">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />Advanced customization</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />Custom API access</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />Early access to new features</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 opacity-80 mr-3" />Multi-language support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif text-purple-900 mb-4">Questions answered</h2>
            <p className="text-gray-600 mb-12">We're here to help you and solve objections. Find answers to the most common questions below.</p>

            <div className="space-y-4">
              {[
                {
                  question: "What is Handsy?",
                  answer: "Handsy is a cutting-edge platform that translates between text and sign language, making communication accessible for everyone."
                },
                {
                  question: "How accurate is Handsy's sign language translation?",
                  answer: "Our AI-powered system achieves over 95% accuracy in translations, constantly learning and improving through user feedback."
                },
                {
                  question: "Can I switch plans later?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "Which sign languages does Handsy support?",
                  answer: "We support multiple sign languages including ASL, BSL, and many more. New languages are added regularly."
                }
              ].map((faq, index) => (
                <details key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Feel free to mail us for any enquiries: <a href="mailto:handsy@gmail.com" className="text-purple-600">handsy@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-purple-900 mb-4">Join the <span className="italic">Handsy</span> Community!</h2>
            <p className="text-gray-600">Follow us on Instagram, Facebook, and Twitter to stay updated! Join the conversation, share your thoughts, and be part of our growing community.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <Twitter className="w-8 h-8" />
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-6">Stay updated with the latest news, expert tips, and insightful guides from industry leaders! 📢</p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">25k followers</span>
                <span className="text-purple-600 text-sm font-medium">Community</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <Instagram className="w-8 h-8" />
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-6">Stay inspired with updates and tips. Engage with our community and be the first to know about new features! 🚀✨</p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">17k followers</span>
                <span className="text-purple-600 text-sm font-medium">Community</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <Facebook className="w-8 h-8" />
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-6">Be part of our growing community, stay updated with the latest news and guides. Let's learn and grow together! 🎯</p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">22k followers</span>
                <span className="text-purple-600 text-sm font-medium">Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-serif text-purple-900 mb-6">Why wait? Experience <span className="italic">Handsy</span> today!</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Loved by thousands, Handsy makes everything easier, helping you save time and get more done effortlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white px-6 py-2 rounded-full flex items-center gap-2">
              <Gauge className="w-5 h-5 text-purple-600" />
              <span>High accuracy</span>
            </div>
            <div className="bg-white px-6 py-2 rounded-full flex items-center gap-2">
              <Users2 className="w-5 h-5 text-purple-600" />
              <span>Seamless experience</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/converter"
              className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition"
            >
              Try Handsy now!
            </Link>
            <Link
              to="/learn"
              className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              Learn Sign Language
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}