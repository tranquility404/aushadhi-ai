'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TargetSelectionForm from '../../components/ui/TargetSelectionForm';

export default function TargetSelectionPage() {
  const router = useRouter();
  const [disease, setDisease] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleStartScreening = (diseaseName: string) => {
    setDisease(diseaseName);
    setError(null);
      // try {
      // const response = await startScreening(diseaseName);
      // const response = await findTargetProtein(diseaseName);
      // console.log(response.data);
      router.push(`/results?disease=${encodeURIComponent(diseaseName)}`);
    // } catch (error) {
      // console.error('Error during screening:', error);
      // setError('An unexpected error occurred. Please try again.');
    // }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <TargetSelectionForm 
          onSubmit={handleStartScreening} 
          serverError={error}
        />
    </div>
  );
}
