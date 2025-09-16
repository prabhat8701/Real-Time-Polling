'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Plus, 
  Vote, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Clock
} from 'lucide-react'
import { io, Socket } from 'socket.io-client'

interface User {
  id: string
  name: string
  email: string
}

interface PollOption {
  id: string
  text: string
  count: number
}

interface Poll {
  id: string
  question: string
  isPublished: boolean
  createdAt: string
  creator: { id: string; name: string }
  options: PollOption[]
}

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState<'users' | 'polls' | 'voting'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [polls, setPolls] = useState<Poll[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [liveUpdates, setLiveUpdates] = useState<any[]>([])
  
  // Form states
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
  const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''] })
  const [selectedPoll, setSelectedPoll] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<string>('')
  
  // Status states
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    // Initialize socket connection for demo - using port 3001 where backend runs
    const newSocket = io('http://localhost:3001', { 
      autoConnect: false,
      timeout: 5000,
      transports: ['websocket', 'polling']
    })
    
    newSocket.on('connect', () => {
      setIsConnected(true)
      setConnectionError(null)
      setMessage({ type: 'success', text: 'Connected to real-time server!' })
    })
    
    newSocket.on('disconnect', () => {
      setIsConnected(false)
      setMessage({ type: 'error', text: 'Disconnected from server' })
    })

    newSocket.on('connect_error', (error) => {
      setIsConnected(false)
      setConnectionError(error.message)
      setMessage({ type: 'error', text: `Connection failed: ${error.message}` })
    })
    
    newSocket.on('pollUpdated', (payload) => {
      setLiveUpdates(prev => [
        { 
          timestamp: new Date().toLocaleTimeString(), 
          type: 'poll_update', 
          data: payload 
        },
        ...prev.slice(0, 4)
      ])
      
      // Update local poll data
      setPolls(prev => prev.map(poll => 
        poll.id === payload.pollId 
          ? { ...poll, options: payload.options }
          : poll
      ))
    })
    
    setSocket(newSocket)
    
    return () => {
      newSocket.close()
    }
  }, [])

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      showMessage('error', 'Please fill in all fields')
      return
    }
    
    setLoading(true)
    try {
      // Make actual API call to backend
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create user')
      }

      const user = await response.json()
      setUsers(prev => [...prev, user])
      setNewUser({ name: '', email: '', password: '' })
      showMessage('success', `User "${user.name}" created successfully!`)
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to create user. Make sure backend is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const createPoll = async () => {
    if (!newPoll.question || newPoll.options.some(opt => !opt.trim())) {
      showMessage('error', 'Please fill in question and all options')
      return
    }
    
    if (users.length === 0) {
      showMessage('error', 'Create a user first to be the poll creator')
      return
    }
    
    setLoading(true)
    try {
      // Make actual API call to backend
      const response = await fetch('http://localhost:3001/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newPoll.question,
          creatorId: users[0].id,
          isPublished: true,
          options: newPoll.options.filter(opt => opt.trim())
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create poll')
      }

      const poll = await response.json()
      setPolls(prev => [...prev, poll])
      setNewPoll({ question: '', options: ['', ''] })
      showMessage('success', 'Poll created successfully!')
      
      // Join poll room for real-time updates
      if (socket && isConnected) {
        socket.emit('joinPoll', poll.id)
      }
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to create poll. Make sure backend is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const submitVote = async (optionId: string) => {
    if (!selectedUser) {
      showMessage('error', 'Please select a user to vote as')
      return
    }
    
    setLoading(true)
    try {
      // Make actual API call to backend
      const response = await fetch('http://localhost:3001/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser,
          optionId: optionId
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit vote')
      }

      const result = await response.json()
      
      // Update local poll data with the response
      setPolls(prev => prev.map(poll => 
        poll.id === result.pollId 
          ? { ...poll, options: result.options }
          : poll
      ))
      
      showMessage('success', 'Vote submitted! Real-time update sent.')
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to submit vote. Make sure backend is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const connectSocket = () => {
    if (socket && !isConnected) {
      socket.connect()
    }
  }

  return (
    <div className="space-y-8">
      {/* Demo Navigation */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <div className="flex space-x-1">
            {[
              { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
              { id: 'polls', label: 'Polls', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'voting', label: 'Real-time Voting', icon: <Zap className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? 
            <CheckCircle className="w-5 h-5" /> : 
            <AlertCircle className="w-5 h-5" />
          }
          <span>{message.text}</span>
        </div>
      )}

      {/* Socket Connection Status */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div>
              <span className="text-sm font-medium">
                Socket.IO: {isConnected ? 'Connected' : 'Disconnected'}
              </span>
              {connectionError && (
                <p className="text-xs text-red-600 mt-1">
                  Error: {connectionError}
                </p>
              )}
              {!isConnected && !connectionError && (
                <p className="text-xs text-gray-500 mt-1">
                  Make sure backend is running on port 3001
                </p>
              )}
            </div>
          </div>
          {!isConnected && (
            <button
              onClick={connectSocket}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Connect
            </button>
          )}
        </div>
      </div>

      {/* Demo Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {activeDemo === 'users' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Create User
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={createUser}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{loading ? 'Creating...' : 'Create User'}</span>
                </button>
              </div>
            </div>
          )}

          {activeDemo === 'polls' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Create Poll
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Poll Question"
                  value={newPoll.question}
                  onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {newPoll.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newPoll.options]
                      newOptions[index] = e.target.value
                      setNewPoll(prev => ({ ...prev, options: newOptions }))
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setNewPoll(prev => ({ ...prev, options: [...prev.options, ''] }))}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Option
                  </button>
                  {newPoll.options.length > 2 && (
                    <button
                      onClick={() => setNewPoll(prev => ({ ...prev, options: prev.options.slice(0, -1) }))}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove Last
                    </button>
                  )}
                </div>
                <button
                  onClick={createPoll}
                  disabled={loading || users.length === 0}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{loading ? 'Creating...' : 'Create Poll'}</span>
                </button>
                {users.length === 0 && (
                  <p className="text-sm text-gray-500">Create a user first to be the poll creator</p>
                )}
              </div>
            </div>
          )}

          {activeDemo === 'voting' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Vote className="w-5 h-5 mr-2" />
                Cast Vote
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vote as User:</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a user...</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                
                {polls.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Create a poll first to enable voting</p>
                ) : (
                  <div className="space-y-4">
                    {polls.map(poll => (
                      <div key={poll.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">{poll.question}</h4>
                        <div className="space-y-2">
                          {poll.options.map(option => (
                            <div key={option.id} className="flex items-center justify-between">
                              <button
                                onClick={() => submitVote(option.id)}
                                disabled={loading || !selectedUser}
                                className="flex-1 text-left px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                              >
                                {option.text}
                              </button>
                              <span className="ml-3 px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                                {option.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Live Data Display */}
        <div className="space-y-6">
          {/* Users List */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Created Users ({users.length})</h3>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No users created yet</p>
            ) : (
              <div className="space-y-2">
                {users.map(user => (
                  <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Polls List */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Polls ({polls.length})</h3>
            {polls.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No polls created yet</p>
            ) : (
              <div className="space-y-4">
                {polls.map(poll => (
                  <div key={poll.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{poll.question}</h4>
                    <p className="text-sm text-gray-500 mb-3">by {poll.creator.name}</p>
                    <div className="space-y-2">
                      {poll.options.map(option => (
                        <div key={option.id} className="flex items-center justify-between text-sm">
                          <span>{option.text}</span>
                          <span className="font-medium">{option.count} votes</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Updates */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Live Updates
            </h3>
            {liveUpdates.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No real-time updates yet</p>
            ) : (
              <div className="space-y-2">
                {liveUpdates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Poll Updated</p>
                      <p className="text-xs text-gray-500">{update.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
