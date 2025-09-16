'use client'

import { useState } from 'react'
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle, 
  Code, 
  Database,
  Zap,
  Users,
  BarChart3,
  Shield
} from 'lucide-react'
import Link from 'next/link'

interface Endpoint {
  method: string
  path: string
  description: string
  requestBody?: any
  response: any
  example: string
  notes?: string[]
}

interface ApiSection {
  title: string
  icon: React.ReactNode
  description: string
  endpoints: Endpoint[]
}

export default function ApiDocs() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const apiSections: ApiSection[] = [
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      description: 'User management endpoints for registration and retrieval',
      endpoints: [
        {
          method: 'POST',
          path: '/users',
          description: 'Create a new user account',
          requestBody: {
            name: 'string',
            email: 'string',
            password: 'string'
          },
          response: {
            id: 'string',
            name: 'string',
            email: 'string'
          },
          example: `curl -X POST http://localhost:3001/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'`
        },
        {
          method: 'GET',
          path: '/users/:id',
          description: 'Retrieve user information by ID',
          response: {
            id: 'string',
            name: 'string',
            email: 'string'
          },
          example: `curl -X GET http://localhost:3001/users/user_123`
        }
      ]
    },
    {
      title: 'Polls',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Poll creation and retrieval with vote counts',
      endpoints: [
        {
          method: 'POST',
          path: '/polls',
          description: 'Create a new poll with options',
          requestBody: {
            question: 'string',
            creatorId: 'string',
            isPublished: 'boolean (optional)',
            options: 'string[]'
          },
          response: {
            id: 'string',
            question: 'string',
            isPublished: 'boolean',
            createdAt: 'string',
            updatedAt: 'string',
            creator: { id: 'string', name: 'string', email: 'string' },
            options: [{ id: 'string', text: 'string' }]
          },
          example: `curl -X POST http://localhost:3001/polls \\
  -H "Content-Type: application/json" \\
  -d '{
    "question": "What is your favorite programming language?",
    "creatorId": "user_123",
    "isPublished": true,
    "options": ["JavaScript", "TypeScript", "Python", "Go"]
  }'`
        },
        {
          method: 'GET',
          path: '/polls',
          description: 'List all polls with vote counts',
          response: [{
            id: 'string',
            question: 'string',
            isPublished: 'boolean',
            createdAt: 'string',
            updatedAt: 'string',
            creator: { id: 'string', name: 'string' },
            options: [{ id: 'string', text: 'string', count: 'number' }]
          }],
          example: `curl -X GET http://localhost:3001/polls`
        },
        {
          method: 'GET',
          path: '/polls/:id',
          description: 'Get specific poll details with vote counts',
          response: {
            id: 'string',
            question: 'string',
            isPublished: 'boolean',
            createdAt: 'string',
            updatedAt: 'string',
            creator: { id: 'string', name: 'string' },
            options: [{ id: 'string', text: 'string', count: 'number' }]
          },
          example: `curl -X GET http://localhost:3000/polls/poll_123`
        }
      ]
    },
    {
      title: 'Votes',
      icon: <Zap className="w-5 h-5" />,
      description: 'Real-time voting with Socket.IO broadcasts',
      endpoints: [
        {
          method: 'POST',
          path: '/votes',
          description: 'Submit a vote (triggers real-time update to all connected clients)',
          requestBody: {
            userId: 'string',
            optionId: 'string'
          },
          response: {
            pollId: 'string',
            options: [{ id: 'string', text: 'string', count: 'number' }]
          },
          example: `curl -X POST http://localhost:3001/votes \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_456",
    "optionId": "option_789"
  }'`,
          notes: [
            'Enforces one vote per user per poll',
            'Broadcasts updated vote counts to Socket.IO room',
            'Returns 409 if user has already voted in this poll'
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
                  <p className="text-gray-600">Complete reference for all endpoints</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">API Overview</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Base URL</h3>
                <code className="text-sm bg-gray-100 px-3 py-1 rounded">http://localhost:3000</code>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Type</h3>
                <code className="text-sm bg-gray-100 px-3 py-1 rounded">application/json</code>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Zap className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time</h3>
                <code className="text-sm bg-gray-100 px-3 py-1 rounded">Socket.IO</code>
              </div>
            </div>
          </div>
        </div>

        {/* WebSocket Documentation */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">WebSocket Events</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Socket.IO Real-time Updates</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Join Poll Room</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-white">
                    <pre className="text-sm overflow-x-auto">
{`const socket = io('http://localhost:3000');
socket.emit('joinPoll', pollId);`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Listen for Updates</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-white">
                    <pre className="text-sm overflow-x-auto">
{`socket.on('pollUpdated', (payload) => {
  // payload = { pollId, options: [{ id, text, count }, ...] }
  console.log('Live update:', payload);
});`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Leave Poll Room</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-white">
                    <pre className="text-sm overflow-x-auto">
{`socket.emit('leavePoll', pollId);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-12">
          {apiSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>

              <div className="space-y-8">
                {section.endpoints.map((endpoint, endpointIndex) => (
                  <div key={endpointIndex} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{endpoint.description}</p>
                    </div>

                    <div className="p-6 space-y-6">
                      {endpoint.requestBody && (
                        <div>
                          <h4 className="text-md font-semibold text-gray-900 mb-3">Request Body</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <pre className="text-sm text-gray-800">
                              {JSON.stringify(endpoint.requestBody, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Response</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <pre className="text-sm text-gray-800">
                            {JSON.stringify(endpoint.response, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {endpoint.notes && (
                        <div>
                          <h4 className="text-md font-semibold text-gray-900 mb-3">Notes</h4>
                          <ul className="space-y-1">
                            {endpoint.notes.map((note, noteIndex) => (
                              <li key={noteIndex} className="text-gray-600 flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-md font-semibold text-gray-900">Example</h4>
                          <button
                            onClick={() => copyToClipboard(endpoint.example, `${endpoint.method}-${endpoint.path}`)}
                            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {copiedEndpoint === `${endpoint.method}-${endpoint.path}` ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-green-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 text-white">
                          <pre className="text-sm overflow-x-auto">{endpoint.example}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Error Responses */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Error Responses</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Common Error Codes</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                { code: 400, message: 'Bad Request', description: 'Invalid request body or parameters' },
                { code: 404, message: 'Not Found', description: 'Resource not found' },
                { code: 409, message: 'Conflict', description: 'Resource already exists or constraint violation' },
                { code: 500, message: 'Internal Server Error', description: 'Server error occurred' }
              ].map((error, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {error.code}
                      </span>
                      <span className="font-medium text-gray-900">{error.message}</span>
                    </div>
                    <span className="text-gray-600 text-sm">{error.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
