'use client';

import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';

const WordCard = ({
  word,
  onNext,
  onPrevious,
  currentIndex,
  totalWords,
  showAnswer: initialShowAnswer = false
}) => {
  const [showAnswer, setShowAnswer] = useState(initialShowAnswer);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const {
    addCompletedWord,
    incrementReviewCount,
    reviewCount,
    dailyGoal,
    isGoalAchieved
  } = useProgress();

  // Reset state when word changes
  useEffect(() => {
    setShowAnswer(initialShowAnswer);
    setIsFlipped(false);
    setUserAnswer('');
    setFeedback(null);
  }, [word, initialShowAnswer]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const handleNext = () => {
    // Mark current word as completed when user clicks "Next"
    if (word) {
      addCompletedWord({
        id: word.id || Math.random().toString(36).substr(2, 9),
        word: word.word || word.text || word.term || '',
        definition: word.definition || word.meaning || word.translation || '',
        pronunciation: word.pronunciation || '',
        example: word.example || '',
      });

      incrementReviewCount();
    }

    // Call the provided onNext callback
    if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;

    const isCorrect = userAnswer.toLowerCase().trim() ===
      (word.answer || word.translation || '').toLowerCase().trim();

    setFeedback({
      isCorrect,
      message: isCorrect ? 'Correct! Well done!' : `Not quite. The correct answer is: ${word.answer || word.translation || ''}`
    });

    if (isCorrect) {
      addCompletedWord({
        id: word.id || Math.random().toString(36).substr(2, 9),
        word: word.word || word.text || word.term || '',
        definition: word.definition || word.meaning || word.translation || '',
        pronunciation: word.pronunciation || '',
        example: word.example || '',
      });

      incrementReviewCount();
    }
  };

  const getProgressPercentage = () => {
    return Math.round((reviewCount / dailyGoal) * 100);
  };

  const getCardStyle = () => {
    const baseStyle = {
      width: '100%',
      maxWidth: '500px',
      height: '300px',
      perspective: '1000px',
      margin: '0 auto',
    };

    return baseStyle;
  };

  const getCardInnerStyle = () => {
    const baseStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.6s',
      transformStyle: 'preserve-3d',
      cursor: 'pointer',
    };

    return baseStyle;
  };

  const getCardFaceStyle = (isBack = false) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    background: isBack
      ? 'linear-gradient(135deg, var(--primary-blue), #0056b3)'
      : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
    color: isBack ? 'white' : 'var(--text-primary)',
    transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
  });

  if (!word) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>No word available</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {/* Progress Indicator */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Today's Progress: {reviewCount}/{dailyGoal} words
          </span>
          <span style={{
            fontSize: '14px',
            color: isGoalAchieved ? 'var(--accent-yellow)' : 'var(--text-secondary)',
            fontWeight: isGoalAchieved ? 'bold' : 'normal'
          }}>
            {isGoalAchieved ? '🎉 Goal Achieved!' : `${getProgressPercentage()}%`}
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${getProgressPercentage()}%`,
            height: '100%',
            background: isGoalAchieved
              ? 'linear-gradient(90deg, var(--accent-yellow), #f0c419)'
              : 'linear-gradient(90deg, var(--primary-blue), #0056b3)',
            transition: 'width 0.3s ease',
            borderRadius: '4px'
          }} />
        </div>
      </div>

      {/* Word Counter */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          padding: '4px 12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '20px'
        }}>
          {currentIndex + 1} / {totalWords}
        </span>
      </div>

      {/* Flash Card */}
      <div style={getCardStyle()}>
        <div
          style={{
            ...getCardInnerStyle(),
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div style={getCardFaceStyle(false)}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
              {word.word || word.text || word.term || ''}
            </div>
            {word.pronunciation && (
              <div style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                fontStyle: 'italic'
              }}>
                [{word.pronunciation}]
              </div>
            )}
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Click to reveal answer
            </div>
          </div>

          {/* Back of card */}
          <div style={getCardFaceStyle(true)}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              {word.definition || word.meaning || word.translation || ''}
            </div>
            {word.example && (
              <div style={{
                fontSize: '14px',
                opacity: 0.9,
                fontStyle: 'italic',
                marginTop: '12px'
              }}>
                Example: {word.example}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Answer Input Section */}
      {showAnswer && word.answer && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            style={{
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '16px',
              width: '100%',
              maxWidth: '300px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <button
            onClick={checkAnswer}
            style={{
              marginLeft: '12px',
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
            Check
          </button>

          {feedback && (
            <div style={{
              marginTop: '12px',
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: feedback.isCorrect ? '#d4edda' : '#f8d7da',
              color: feedback.isCorrect ? '#155724' : '#721c24',
              fontSize: '14px'
            }}>
              {feedback.message}
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '32px',
        gap: '16px'
      }}>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            padding: '12px 24px',
            backgroundColor: currentIndex === 0 ? '#e9ecef' : '#6c757d',
            color: currentIndex === 0 ? '#adb5bd' : 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            flex: '1'
          }}
        >
          Previous
        </button>

        <button
          onClick={handleFlip}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            flex: '1'
          }}
        >
          {showAnswer ? 'Show Question' : 'Show Answer'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex >= totalWords - 1}
          style={{
            padding: '12px 24px',
            backgroundColor: currentIndex >= totalWords - 1 ? '#e9ecef' : 'var(--primary-blue)',
            color: currentIndex >= totalWords - 1 ? '#adb5bd' : 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: currentIndex >= totalWords - 1 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            flex: '1'
          }}
        >
          Next
        </button>
      </div>

      {/* Goal Achievement Message */}
      {isGoalAchieved && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'rgba(253, 231, 0, 0.1)',
          border: '2px solid var(--accent-yellow)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎉</div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '4px'
          }}>
            Daily Goal Achieved!
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            You've completed {dailyGoal} words today. Great job!
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCard;