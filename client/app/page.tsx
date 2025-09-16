'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Server, 
  Database, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Code, 
  Globe,
  CheckCircle,
  ArrowRight,
  Github,
  ExternalLink,
  BookOpen
} from 'lucide-react'
import DemoSection from '../components/DemoSection'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "User Management",
      description: "Secure user registration with bcrypt password hashing and email validation"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      title: "Poll Creation",
      description: "Create polls with multiple options and publish/unpublish functionality"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Real-time Voting",
      description: "Live vote updates using Socket.IO with room-based broadcasting"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-500" />,
      title: "PostgreSQL + Prisma",
      description: "Robust database schema with proper relations and constraints"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Input Validation",
      description: "Comprehensive validation using Zod schemas for all endpoints"
    },
    {
      icon: <Server className="w-8 h-8 text-indigo-500" />,
      title: "RESTful API",
      description: "Well-structured Express.js API with proper error handling"
    }
  ]

  const endpoints = [
    { method: 'POST', path: '/users', description: 'Create a new user account' },
    { method: 'GET', path: '/users/:id', description: 'Retrieve user information' },
    { method: 'POST', path: '/polls', description: 'Create a new poll with options' },
    { method: 'GET', path: '/polls', description: 'List all polls with vote counts' },
    { method: 'GET', path: '/polls/:id', description: 'Get specific poll details' },
    { method: 'POST', path: '/votes', description: 'Submit a vote (triggers real-time update)' },
    { method: 'GET', path: '/health', description: 'Health check endpoint' }
  ]

  const techStack = [
    { name: 'TypeScript', description: 'Type-safe development' },
    { name: 'Node.js', description: 'Runtime environment' },
    { name: 'Express.js', description: 'Web framework' },
    { name: 'PostgreSQL', description: 'Database' },
    { name: 'Prisma ORM', description: 'Database toolkit' },
    { name: 'Socket.IO', description: 'Real-time communication' },
    { name: 'Zod', description: 'Schema validation' },
    { name: 'bcrypt', description: 'Password hashing' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Real-Time Polling API</h1>
                <p className="text-gray-600">TypeScript Backend Showcase</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/api-docs"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>API Docs</span>
              </Link>
              <button className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Production-Ready Polling Backend
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive TypeScript Node.js backend featuring real-time voting, 
            secure user management, and a robust REST API built with modern best practices.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setActiveTab('api')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Explore API</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('demo')}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'api', label: 'API Endpoints' },
              { id: 'tech', label: 'Tech Stack' },
              { id: 'demo', label: 'Live Demo' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Features Grid */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      {feature.icon}
                      <h4 className="text-xl font-semibold text-gray-900">{feature.title}</h4>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="bg-white rounded-xl p-8 shadow-sm border">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Architecture Highlights</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Database Design
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Proper relational schema with Prisma ORM</li>
                    <li>• One-to-many: User → Polls, Poll → Options</li>
                    <li>• Many-to-many: Users ↔ Options via Vote table</li>
                    <li>• Unique constraints for data integrity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Real-time Features
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Socket.IO rooms per poll</li>
                    <li>• Live vote count broadcasting</li>
                    <li>• Automatic client updates</li>
                    <li>• Scalable WebSocket architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h3>
              <p className="text-gray-600 mb-6">RESTful API with comprehensive error handling and validation</p>
              <Link
                href="/api-docs"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Documentation</span>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h4 className="text-lg font-semibold text-gray-900">Available Endpoints</h4>
              </div>
              <div className="divide-y divide-gray-200">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                      </div>
                      <span className="text-gray-600 text-sm">{endpoint.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Example Usage
              </h4>
              <pre className="text-sm overflow-x-auto">
{`// Create a new poll
POST /polls
{
  "question": "What's your favorite programming language?",
  "creatorId": "user_123",
  "isPublished": true,
  "options": ["JavaScript", "TypeScript", "Python", "Go"]
}

// Submit a vote (triggers real-time update)
POST /votes
{
  "userId": "user_456",
  "optionId": "option_789"
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h3>
              <p className="text-gray-600">Modern, production-ready technologies</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{tech.name}</h4>
                  <p className="text-gray-600 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Why These Technologies?</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Performance & Scalability</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• TypeScript for type safety and better DX</li>
                    <li>• PostgreSQL for ACID compliance</li>
                    <li>• Prisma for optimized queries</li>
                    <li>• Socket.IO for efficient real-time updates</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Security & Reliability</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• bcrypt for secure password hashing</li>
                    <li>• Zod for runtime type validation</li>
                    <li>• Proper error handling and logging</li>
                    <li>• Database constraints for data integrity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demo' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Interactive Demo</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience the real-time polling functionality firsthand. Create users, polls, and see live vote updates in action.
              </p>
            </div>
            <DemoSection />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Real-Time Polling Backend</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Built with TypeScript, Express, PostgreSQL, Prisma, and Socket.IO
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors">
              Documentation
            </Link>
            <button className="text-gray-400 hover:text-white transition-colors">GitHub</button>
            <Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors">
              API Reference
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
