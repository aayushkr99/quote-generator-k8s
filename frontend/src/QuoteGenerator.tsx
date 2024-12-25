'use client'

import { useState } from 'react'
import './quote-generator.css'
import React from 'react'
export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState([])
  const [count, setCount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('');
  const REACT_APP_BACKEND_URL = "http://localhost:3001"

  const fetchQuotes = async (count: number) => {
    try {
      setIsLoading(true)
      setError('')
      const response = await fetch(`${REACT_APP_BACKEND_URL}/api?number=${count}`)
      if (!response.ok) throw new Error('Failed to fetch quotes')
      const data = await response.json()
      setQuotes(data.quotes)
    } catch (err) {
      setError('Failed to fetch quotes. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!count || Number(count) < 1) {
      setError('Please enter a number greater than 0')
      return
    }
    fetchQuotes(Number(count))
  }

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <h1>Quote Generator</h1>
          <p>Generate inspiring quotes with just one click</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="input-wrapper">
            <input
              type="number"
              value={count}
              onChange={(e: { target: { value: string } }) => {
                const value = e.target.value;
                setCount(value); // Keep as string since count is typed as string
              }}
              placeholder="Enter number of quotes to generate"
              className="input"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="button"
          >
            {isLoading ? (
              <span className="loading">
                <span className="loading-spinner"></span>
                Generating...
              </span>
            ) : (
              'Generate Quotes'
            )}
          </button>
        </form>

        {error && (
          <div className="error">{error}</div>
        )}

        <div className="quotes-grid">
          {quotes.map((quote: any, index: any) => (
            <div key={index} className="quote-card">
              <div className="quote-content">
                <span className="quote-icon">"</span>
                <blockquote>{quote}</blockquote>
              </div>
            </div>
          ))}
        </div>

        {quotes.length > 0 && (
          <div className="quote-count">
            Showing {quotes.length} quote{quotes.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}
