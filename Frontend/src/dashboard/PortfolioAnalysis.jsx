import React from 'react';
import DiversityChart from './DiversityChart';
import RiskScore from './RiskScore';
import PulseAnalysis from './PulseAnalysis';

const PortfolioAnalysis = ({
  diversityData,
  riskData,
  analysisData,
  onSimulatorClick = () => {}
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <DiversityChart chartData={diversityData} />
      <RiskScore {...riskData} />
      <PulseAnalysis insightText={analysisData?.insightText} onRunSimulatorClick={onSimulatorClick} />
    </div>
  );
};

export default PortfolioAnalysis;
