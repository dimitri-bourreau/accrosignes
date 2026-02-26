'use client';

import { useStorageUsage } from '@/features/resources/hooks/use-resources';

const MAX_STORAGE = 5 * 1024 * 1024 * 1024;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Go`;
}

export function StorageBar() {
  const { data } = useStorageUsage();
  const usedBytes = data?.usedBytes ?? 0;
  const percentage = Math.min((usedBytes / MAX_STORAGE) * 100, 100);
  const isHigh = percentage > 80;

  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600 dark:text-gray-300">Stockage</span>
        <span
          className={
            isHigh
              ? 'text-red-600 font-semibold'
              : 'text-gray-600 dark:text-gray-300'
          }
        >
          {formatSize(usedBytes)} / {formatSize(MAX_STORAGE)}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${isHigh ? 'bg-red-500' : 'bg-teal-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
