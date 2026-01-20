import { useState } from 'react';

export const useOpportunityForm = () => {
  const [opportunityName, setOpportunityName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('');

  const isFormValid =
    opportunityName.trim() !== '' &&
    selectedCycle &&
    selectedPhase &&
    selectedStatus &&
    selectedCategory;

  const resetForm = () => {
    setOpportunityName('');
    setSelectedStatus('');
    setSelectedPhase('');
    setSelectedCycle('');
    setSelectedCategory('');
    setSelectedSeries('');
  };

  return {
    // Form values
    opportunityName,
    selectedCategory,
    selectedStatus,
    selectedPhase,
    selectedSeries,
    selectedCycle,
    
    // Setters
    setOpportunityName,
    setSelectedCategory,
    setSelectedStatus,
    setSelectedPhase,
    setSelectedSeries,
    setSelectedCycle,
    
    // Utilities
    isFormValid,
    resetForm
  };
};