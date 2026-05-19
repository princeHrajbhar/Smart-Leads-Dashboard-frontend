import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { useLeads } from '../hooks/useLeads';

export const Dashboard: React.FC = () => {
  const { data, isLoading } = useLeads({
    page: 1,
    limit: 100,
  });

  // Safe fallback
  const leads = data?.data ?? [];

  const stats = [
    {
      title: 'Total Leads',
      value: data?.pagination?.total ?? leads.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Qualified Leads',
      value: leads.filter(
        (lead) => lead.status === 'QUALIFIED'
      ).length,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Conversion Rate',
      value: '24%',
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+5%',
    },
    {
      title: 'Active Leads',
      value: leads.filter(
        (lead) =>
          lead.status !== 'LOST' // Removed WON status check since backend doesn't have it
      ).length,
      icon: Activity,
      color: 'bg-orange-500',
      change: '+18%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your leads.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>

                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>

                    <p className="text-sm text-green-600 mt-2">
                      {stat.change} from last month
                    </p>
                  </div>

                  <div className={`${stat.color} p-3 rounded-full`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Leads
          </h3>

          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading...
              </div>
            ) : leads.length > 0 ? (
              leads.slice(0, 5).map((lead) => (
                <div
                  key={lead._id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {lead.name}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {lead.email}
                    </p>
                  </div>

                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No leads found
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};