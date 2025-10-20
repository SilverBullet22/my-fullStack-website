import React, { useEffect, useState } from "react";

interface Repo {
  name: string;
  html_url: string;
  description: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const GitHubRepoSelector: React.FC<Props> = ({ value, onChange }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        const username = import.meta.env.VITE_GITHUB_USERNAME;
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        console.log("token", response.json())


        if (!response.ok) throw new Error("فشل في جلب المستودعات");
        const data = await response.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        اختر رابط المشروع في GitHub
      </label>

      {loading ? (
        <p className="text-gray-500">جاري التحميل...</p>
      ) : error ? (
        <p className="text-red-500">حدث خطأ: {error}</p>
      ) : (
        <select
          className="w-full text-right px-4 py-1 outline-0 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">اختر مستودع...</option>
          {repos.map((repo) => (
            <option key={repo.name} value={repo.html_url}>
              {repo.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default GitHubRepoSelector;
