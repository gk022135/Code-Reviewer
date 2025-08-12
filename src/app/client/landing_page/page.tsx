"use client"
import { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Upload,
  Brain,
  BarChart3,
  CheckCircle,
  GitCompare,
  Zap,
  Star,
  ArrowRight,
  Play,
  Menu,
  X,
  ArrowBigRight
} from 'lucide-react';

export default function CodeReviewerLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Upload,
      title: "Code Upload & Parsing",
      description: "Support for multiple languages including Python, JavaScript, Java, C++, and more. Drag, drop, and analyze instantly.",
      color: "from-blue-500 to-cyan-500",
      url: "/client/tools/upload"
    },
    {
      icon: Brain,
      title: "AI-Powered Review",
      description: "Context-aware analysis using advanced LLM APIs. Get targeted suggestions that understand your code's intent.",
      color: "from-purple-500 to-pink-500",
      url : "client/tools/ai-power-review"
    },
    {
      icon: BarChart3,
      title: "Complexity Analysis",
      description: "Automatically calculate time and space complexity for functions. Identify performance bottlenecks before they become problems.",
      color: "from-green-500 to-teal-500",
      url: "/client/tools/analyiser"
    },
    {
      icon: CheckCircle,
      title: "Best Practice Checker",
      description: "Validate against industry standards like PEP8, ESLint, and more. Maintain consistent, professional code quality.",
      color: "from-orange-500 to-red-500",
      url: "client/tools/best-practice"
    },
    {
      icon: GitCompare,
      title: "Version Comparison",
      description: "Compare code versions side-by-side with intelligent diff analysis. Track improvements and changes over time.",
      color: "from-indigo-500 to-purple-500",
      url: "client/tools/version-ctrl"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer at TechCorp",
      quote: "This tool caught performance issues I completely missed. It's like having a senior developer review every line of code.",
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead at StartupXYZ",
      quote: "The complexity analysis feature alone saved our team hours of debugging. Game-changer for code quality.",
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Full-Stack Engineer",
      quote: "Finally, a code review tool that understands context. The AI suggestions are surprisingly insightful.",
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}


      {/* Hero Section */}
      <section className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-blue-500/20">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">AI-Powered Code Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Your Smart
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Peer Reviewer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Upload your code, find bugs, get optimization suggestions, and understand complexity —
            all powered by advanced AI that actually understands your code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2">
              <span>Try It Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="text-lg">Watch Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need for comprehensive code analysis and optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur"
                  style={{ background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 h-full">
                  <div className='flex justify-between'>
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>

                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 right-0`}
                    >
                      {feature.url ? (
                        <Link href={feature.url}>
                          <ArrowBigRight className="text-white cursor-pointer hover:text-blue-300 transition-colors" />
                        </Link>
                      ) : (
                        <ArrowBigRight className="text-white" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">Simple, fast, and incredibly powerful</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Your Code", desc: "Drag and drop files or paste code directly. We support 10+ programming languages." },
              { step: "02", title: "AI Analysis", desc: "Our advanced AI reviews your code for bugs, performance issues, and optimization opportunities." },
              { step: "03", title: "Get Insights", desc: "Receive detailed feedback, complexity analysis, and actionable suggestions to improve your code." }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-24 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-400">See what developers are saying about CodeReviewer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Improve Your Code?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of developers who are already using CodeReviewer to write better code.
          </p>
          <button className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CodeReviewer</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-gray-500">
            <p>&copy; 2025 CodeReviewer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}