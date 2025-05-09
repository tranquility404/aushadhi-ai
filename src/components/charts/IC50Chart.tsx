'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicBarComponent = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Bar),
  { ssr: false }
);

let ChartJS: any;
let CategoryScale: any;
let LinearScale: any;
let BarElement: any;
let Title: any;
let Tooltip: any;
let Legend: any;

interface IC50ChartProps {
  molecules: Array<{
    name: string;
    ic50Value: number;
  }>;
  title?: string;
}

const IC50Chart: React.FC<IC50ChartProps> = ({ molecules, title = 'IC50 Values Comparison' }) => {
  const [chartInitialized, setChartInitialized] = useState(false);
  
  useEffect(() => {
    const initChart = async () => {
      const Chart = await import('chart.js');
      
      ChartJS = Chart.Chart;
      CategoryScale = Chart.CategoryScale;
      LinearScale = Chart.LinearScale;
      BarElement = Chart.BarElement;
      Title = Chart.Title;
      Tooltip = Chart.Tooltip;
      Legend = Chart.Legend;
      
      Chart.Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
      setChartInitialized(true);
    };
    
    initChart();
  }, []);

  const sortedMolecules = [...molecules].sort((a, b) => a.ic50Value - b.ic50Value);
  
  const labels = sortedMolecules.map(molecule => molecule.name);
  const ic50Values = sortedMolecules.map(molecule => molecule.ic50Value);
  
  const backgroundColors = ic50Values.map(value => {
    if (value < 1) return 'rgba(34, 197, 94, 0.6)';
    if (value < 5) return 'rgba(234, 179, 8, 0.6)';
    return 'rgba(239, 68, 68, 0.6)';
  });
    const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: title ? true : false,
        text: title,
        font: {
          size: 14,
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `IC50: ${context.raw} nM`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'IC50 Value (nM)',
          font: {
            size: 12,
          },
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Compounds',
          font: {
            size: 12,
          },
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'IC50 (nM)',
        data: ic50Values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };
    if (!chartInitialized) {
    return (
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-full w-full">
        <DynamicBarComponent 
          options={options}
          data={data}
        />
      </div>
    </div>
  );
};

export default IC50Chart;
