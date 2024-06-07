"use client"
import { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { supabase } from '@/utils/supabse';

export default function Review() {
  const [safetyRating, setSafetyRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [recommend, setRecommend] = useState(null);
  const [praise, setPraise] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating, setRating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        size={32}
        color={star <= rating ? 'gold' : 'gray'}
        onClick={() => setRating(star)}
        className="mr-2 cursor-pointer"
      />
    ));
  };

  const renderPraiseButton = (label, value, color) => {
    return (
      <button
        onClick={() => setPraise(value)}
        className={`px-4 py-2 mr-2 text-white rounded-md cursor-pointer transition-all duration-200 ${praise === value ? color : 'bg-gray-300 hover:bg-gray-400'}`}
      >
        {label}
      </button>
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const { data, error } = await supabase
      .from('Review') 
      .insert([
        {
          Safety: safetyRating,
          Communication: communicationRating,
          Recommend: recommend,
          Praise: praise,
        },
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting review:', error);
    } else {
      console.log('Review submitted successfully:', data);

    }
  };

  return (
    <div className="flex flex-col items-start max-w-md p-4 m-2 mx-auto md:p-6">
      <h1 className="pb-12 mb-4 text-4xl font-extrabold md:text-3xl md:mb-6">Leave a Review</h1>
      
      <div className="w-full mb-4 md:mb-6">
        <h2 className="mb-1 text-2xl font-bold md:text-2xl">Safety</h2>
        <h3 className="mb-2 text-xl font-light md:text-xl">Rate your safety with Ayuvya Ayurveda</h3>
        <div className="flex">
          {renderStars(safetyRating, setSafetyRating)}
        </div>
      </div>
      
      <div className="w-full mb-4 md:mb-6">
        <h2 className="mb-1 text-2xl font-bold md:text-2xl">Communication</h2>
        <h3 className="mb-2 text-xl font-light md:text-xl">Rate the communication with Ayuvya Ayurveda</h3>
        <div className="flex">
          {renderStars(communicationRating, setCommunicationRating)}
        </div>
      </div>
      
      <div className="w-full mb-4 md:mb-6">
        <h2 className="mb-1 text-2xl font-bold md:text-2xl">Would you recommend?</h2>
        <div className="flex">
          <FaThumbsUp
            size={32}
            color={recommend === 'yes' ? 'green' : 'gray'}
            onClick={() => setRecommend('yes')}
            className="mr-4 cursor-pointer"
          />
          <FaThumbsDown
            size={32}
            color={recommend === 'no' ? 'red' : 'gray'}
            onClick={() => setRecommend('no')}
            className="cursor-pointer"
          />
        </div>
      </div>
      
      <div className="w-full mb-4 md:mb-6">
        <h2 className="mb-1 text-2xl font-bold md:text-2xl">Praise</h2>
        <div className="flex">
          {renderPraiseButton('Very Good', 'very-good', 'bg-green-500')}
          {renderPraiseButton('Good', 'good', 'bg-yellow-500')}
          {renderPraiseButton('Poor', 'poor', 'bg-red-500')}
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="px-6 py-3 text-white transition-all duration-200 bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
