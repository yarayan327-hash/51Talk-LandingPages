'use client';

import React, { useState } from 'react';
import WordCard from '../components/WordCard';
import { useProgress } from '../context/ProgressContext';

// Sample words data
const sampleWords = [
  {
    id: 1,
    word: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing',
    pronunciation: '/ˈeləkwənt/',
    example: 'She gave an eloquent speech at the conference.',
    answer: 'Eloquent'
  },
  {
    id: 2,
    word: 'Serendipity',
    definition: 'The occurrence of events by chance in a happy way',
    pronunciation: '/ˌserənˈdɪpəti/',
    example: 'Finding that book was pure serendipity.',
    answer: 'Serendipity'
  },
  {
    id: 3,
    word: 'Ephemeral',
    definition: 'Lasting for a very short time',
    pronunciation: '/ɪˈfemərəl/',
    example: 'The beauty of cherry blossoms is ephemeral.',
    answer: 'Ephemeral'
  },
  {
    id: 4,
    word: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere',
    pronunciation: '/juːˈbɪkwɪtəs/',
    example: 'Smartphones have become ubiquitous in modern society.',
    answer: 'Ubiquitous'
  },
  {
    id: 5,
    word: 'Pragmatic',
    definition: 'Dealing with things sensibly and realistically',
    pronunciation: '/præɡˈmætɪk/',
    example: 'We need a pragmatic approach to solve this problem.',
    answer: 'Pragmatic'
  }
];

export default function WordsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    reviewCount,
    completedWords,
    dailyGoal,
    isGoalAchieved,
    currentStreak,
    setDailyGoal
  } = useProgress();

  const currentWord = sampleWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < sampleWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGoalChange = (newGoal) => {
    const goal = parseInt(newGoal, 10);
    if (!isNaN(goal) && goal > 0) {
      setDailyGoal(goal);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      padding: '40px 20px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}>
            Word Learning Practice
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Expand your vocabulary with our interactive flashcards. Track your progress and achieve your daily learning goals.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'var(--primary-blue)',
              marginBottom: '8px'
            }}>
              {reviewCount}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Words Reviewed
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'var(--accent-yellow)',
              marginBottom: '8px'
            }}>
              {currentStreak}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Day Streak 🔥
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: isGoalAchieved ? '#28a745' : 'var(--primary-blue)',
              marginBottom: '8px'
            }}>
              {completedWords.length}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Completed Today
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'var(--primary-blue)',
              marginBottom: '8px'
            }}>
              {dailyGoal}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Daily Goal
            </div>
          </div>
        </div>

        {/* Daily Goal Setting */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Adjust Daily Goal:
          </label>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => handleGoalChange(Math.max(1, dailyGoal - 5))}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              -5
            </button>
            <input
              type="number"
              value={dailyGoal}
              onChange={(e) => handleGoalChange(e.target.value)}
              min="1"
              max="100"
              style={{
                padding: '8px 12px',
                border: '2px solid #e9ecef',
                borderRadius: '6px',
                fontSize: '16px',
                width: '80px',
                textAlign: 'center'
              }}
            />
            <button
              onClick={() => handleGoalChange(Math.min(100, dailyGoal + 5))}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              +5
            </button>
          </div>
        </div>

        {/* Word Card */}
        <WordCard
          word={currentWord}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentIndex={currentIndex}
          totalWords={sampleWords.length}
        />

        {/* Completed Words List */}
        {completedWords.length > 0 && (
          <div style={{
            marginTop: '40px',
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              Today's Completed Words ({completedWords.length})
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '12px'
            }}>
              {completedWords.slice(-10).map((word, index) => (
                <div
                  key={`${word.id}-${index}`}
                  style={{
                    padding: '12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}
                >
                  <div style={{
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    {word.word}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}>
                    {word.definition}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completion Message */}
        {currentIndex >= sampleWords.length - 1 && isGoalAchieved && (
          <div style={{
            marginTop: '40px',
            textAlign: 'center',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(253, 231, 0, 0.1), rgba(38, 183, 255, 0.1))',
            border: '2px solid var(--accent-yellow)',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Congratulations!
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              marginBottom: '16px'
            }}>
              You've completed all words and achieved your daily goal!
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setCurrentIndex(0)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                Review Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}