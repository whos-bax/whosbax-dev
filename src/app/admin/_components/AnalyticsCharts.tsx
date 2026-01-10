'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { DailyStat, PageStat } from '@/features/analytics';
import styles from '../admin.module.scss';

interface DailyChartProps {
  data: DailyStat[];
}

interface PageChartProps {
  data: PageStat[];
}

const COLORS = [
  '#17C964',
  '#0072F5',
  '#F5A524',
  '#F31260',
  '#7828C8',
  '#889096',
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function DailyVisitorChart({ data }: DailyChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    name: formatDate(d.date),
  }));

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--theme-border)' }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={30}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--theme-bg-secondary)',
              border: '1px solid var(--theme-border)',
              borderRadius: 8,
              fontSize: 11,
              padding: '6px 10px',
            }}
            labelStyle={{ fontWeight: 500, marginBottom: 4 }}
            formatter={(value, name) => [
              value,
              name === 'views' ? '조회수' : '방문자',
            ]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ fontSize: 11, paddingBottom: 10 }}
            formatter={(value) => (value === 'views' ? '조회수' : '방문자')}
          />
          <Bar dataKey="views" fill="#17C964" radius={[3, 3, 0, 0]} name="views" />
          <Bar dataKey="unique" fill="#0072F5" radius={[3, 3, 0, 0]} name="unique" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PageViewPieChart({ data }: PageChartProps) {
  const topData = data.slice(0, 6);
  const otherCount = data.slice(6).reduce((sum, d) => sum + d.count, 0);

  const chartData: Array<{ page_path: string; count: number }> =
    otherCount > 0
      ? [...topData, { page_path: '기타', count: otherCount }]
      : [...topData];

  return (
    <div className={styles.pieChartWrapper}>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="page_path"
            cx="50%"
            cy="45%"
            outerRadius="70%"
            label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
            labelLine={{ stroke: 'var(--theme-text-subtle)', strokeWidth: 1 }}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--theme-bg-secondary)',
              border: '1px solid var(--theme-border)',
              borderRadius: 8,
              fontSize: 11,
              padding: '6px 10px',
            }}
            formatter={(value) => [`${value}회`, '조회수']}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
            formatter={(value) => {
              const label = String(value || '');
              return label.length > 15 ? label.slice(0, 15) + '...' : label;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
