import React, { useState } from 'react';
import { TrendingUp, BarChart3, Download, Calculator, Cloud } from 'lucide-react';

interface ServiceComparison {
  service: string;
  aws: { price: number; unit: string; features: string[] };
  azure: { price: number; unit: string; features: string[] };
  gcp: { price: number; unit: string; features: string[] };
  oracle: { price: number; unit: string; features: string[] };
}

interface UsageConfig {
  hours: number;
  storage: number;
  dataTransfer: number;
  instances: number;
}

export const PriceComparison: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('compute');
  const [usage, setUsage] = useState<UsageConfig>({ 
    hours: 730, 
    storage: 100, 
    dataTransfer: 500,
    instances: 1
  });
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const serviceComparisons: Record<string, ServiceComparison[]> = {
    compute: [
      {
        service: 'Virtual Machine (4 vCPU, 16GB RAM)',
        aws: { 
          price: 0.192, 
          unit: '/hour', 
          features: ['EBS Optimized', 'Enhanced Networking', 'Nitro System', 'Instance Store'] 
        },
        azure: { 
          price: 0.184, 
          unit: '/hour', 
          features: ['Premium SSD', 'Accelerated Networking', 'Hyper-V', 'Spot Instances'] 
        },
        gcp: { 
          price: 0.189, 
          unit: '/hour', 
          features: ['Local SSD', 'Custom Machine Types', 'Live Migration', 'Preemptible VMs'] 
        },
        oracle: { 
          price: 0.175, 
          unit: '/hour', 
          features: ['NVMe SSD', 'RDMA Networking', 'Bare Metal Option', 'Always Free Tier'] 
        }
      },
      {
        service: 'Container Service (per vCPU/hour)',
        aws: { 
          price: 0.04048, 
          unit: '/vCPU/hour', 
          features: ['Fargate', 'EKS Integration', 'Auto Scaling', 'AWS VPC'] 
        },
        azure: { 
          price: 0.0367, 
          unit: '/vCPU/hour', 
          features: ['Container Instances', 'AKS Integration', 'Virtual Nodes', 'Azure CNI'] 
        },
        gcp: { 
          price: 0.0381, 
          unit: '/vCPU/hour', 
          features: ['Cloud Run', 'GKE Autopilot', 'Serverless', 'VPC Native'] 
        },
        oracle: { 
          price: 0.034, 
          unit: '/vCPU/hour', 
          features: ['Container Engine', 'OKE Integration', 'Always Free', 'Cloud Shell'] 
        }
      }
    ],
    storage: [
      {
        service: 'Object Storage (Standard)',
        aws: { 
          price: 0.023, 
          unit: '/GB/month', 
          features: ['99.999999999% durability', 'Lifecycle policies', 'Cross-region replication', 'Event notifications'] 
        },
        azure: { 
          price: 0.0208, 
          unit: '/GB/month', 
          features: ['Geo-redundant', 'Tiered storage', 'Lifecycle management', 'Change feed'] 
        },
        gcp: { 
          price: 0.02, 
          unit: '/GB/month', 
          features: ['Multi-regional', 'Nearline/Coldline', 'Object versioning', 'Pub/Sub notifications'] 
        },
        oracle: { 
          price: 0.0255, 
          unit: '/GB/month', 
          features: ['Archive storage', 'Cross-region replication', 'Always Free tier', 'Private endpoints'] 
        }
      },
      {
        service: 'Block Storage (SSD)',
        aws: { 
          price: 0.10, 
          unit: '/GB/month', 
          features: ['gp3 volumes', 'IOPS provisioning', 'Encryption', 'Snapshots'] 
        },
        azure: { 
          price: 0.096, 
          unit: '/GB/month', 
          features: ['Premium SSD', 'Ultra Disk', 'Disk encryption', 'Shared disks'] 
        },
        gcp: { 
          price: 0.17, 
          unit: '/GB/month', 
          features: ['SSD persistent disk', 'Regional disks', 'Encryption', 'Snapshots'] 
        },
        oracle: { 
          price: 0.085, 
          unit: '/GB/month', 
          features: ['Block Volume', 'Ultra High Performance', 'Volume backup', 'Always Free'] 
        }
      }
    ],
    database: [
      {
        service: 'Managed SQL Database (4 vCPU, 16GB)',
        aws: { 
          price: 0.48, 
          unit: '/hour', 
          features: ['RDS Multi-AZ', 'Automated backups', 'Read replicas', 'Performance Insights'] 
        },
        azure: { 
          price: 0.452, 
          unit: '/hour', 
          features: ['SQL Database', 'Auto-tuning', 'Geo-replication', 'Threat detection'] 
        },
        gcp: { 
          price: 0.416, 
          unit: '/hour', 
          features: ['Cloud SQL', 'High availability', 'Point-in-time recovery', 'Query insights'] 
        },
        oracle: { 
          price: 0.372, 
          unit: '/hour', 
          features: ['Autonomous Database', 'Auto-scaling', 'Self-patching', 'Always Free tier'] 
        }
      }
    ],
    networking: [
      {
        service: 'Load Balancer',
        aws: { 
          price: 0.0225, 
          unit: '/hour', 
          features: ['Application Load Balancer', 'SSL termination', 'Path-based routing', 'Health checks'] 
        },
        azure: { 
          price: 0.025, 
          unit: '/hour', 
          features: ['Application Gateway', 'WAF included', 'Autoscaling', 'SSL offloading'] 
        },
        gcp: { 
          price: 0.025, 
          unit: '/hour', 
          features: ['Global Load Balancer', 'CDN integration', 'SSL certificates', 'Anycast IP'] 
        },
        oracle: { 
          price: 0.02, 
          unit: '/hour', 
          features: ['Load Balancer', 'SSL termination', 'Health monitoring', 'Always Free shapes'] 
        }
      }
    ]
  };

  const calculateMonthlyCost = (price: number, category: string): number => {
    switch (category) {
      case 'compute':
        return price * usage.hours * usage.instances;
      case 'storage':
        return price * usage.storage;
      case 'database':
        return price * usage.hours;
      case 'networking':
        return price * usage.hours;
      default:
        return price * usage.hours;
    }
  };

  const getBestValue = (comparison: ServiceComparison): string => {
    const prices = [
      { provider: 'aws', cost: calculateMonthlyCost(comparison.aws.price, selectedCategory) },
      { provider: 'azure', cost: calculateMonthlyCost(comparison.azure.price, selectedCategory) },
      { provider: 'gcp', cost: calculateMonthlyCost(comparison.gcp.price, selectedCategory) },
      { provider: 'oracle', cost: calculateMonthlyCost(comparison.oracle.price, selectedCategory) }
    ];
    
    return prices.reduce((min, current) => current.cost < min.cost ? current : min).provider;
  };

  const getProviderLogo = (provider: string): string => {
    const logos = {
      aws: '🟠',
      azure: '🔵', 
      gcp: '🟢',
      oracle: '🔴'
    };
    return logos[provider as keyof typeof logos] || '☁️';
  };

  const exportReport = () => {
    const reportData = serviceComparisons[selectedCategory]?.map(comparison => ({
      service: comparison.service,
      aws_monthly: calculateMonthlyCost(comparison.aws.price, selectedCategory),
      azure_monthly: calculateMonthlyCost(comparison.azure.price, selectedCategory),
      gcp_monthly: calculateMonthlyCost(comparison.gcp.price, selectedCategory),
      oracle_monthly: calculateMonthlyCost(comparison.oracle.price, selectedCategory),
      best_value: getBestValue(comparison)
    }));

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Service,AWS Monthly Cost,Azure Monthly Cost,GCP Monthly Cost,Oracle Monthly Cost,Best Value\n"
      + reportData?.map(row => 
          `"${row.service}",${row.aws_monthly.toFixed(2)},${row.azure_monthly.toFixed(2)},${row.gcp_monthly.toFixed(2)},${row.oracle_monthly.toFixed(2)},${row.best_value}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cloud-price-comparison-${selectedCategory}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Multi-Cloud Price Comparison</h1>
                <p className="text-gray-600 mt-1">Compare cloud service pricing across AWS, Azure, GCP, and Oracle Cloud</p>
              </div>
            </div>
            <button 
              onClick={exportReport}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'compute', label: 'Compute', icon: '💻', description: 'Virtual machines & containers' },
              { id: 'storage', label: 'Storage', icon: '💾', description: 'Object & block storage' },
              { id: 'database', label: 'Database', icon: '🗄️', description: 'Managed database services' },
              { id: 'networking', label: 'Networking', icon: '🌐', description: 'Load balancers & CDN' }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-900">{category.label}</div>
                <div className="text-sm text-gray-600">{category.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Usage Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Calculator className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Usage Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Hours
              </label>
              <input
                type="number"
                value={usage.hours}
                onChange={(e) => setUsage({...usage, hours: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="730"
              />
              <p className="text-xs text-gray-500 mt-1">Hours per month (730 = 24/7)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage (GB)
              </label>
              <input
                type="number"
                value={usage.storage}
                onChange={(e) => setUsage({...usage, storage: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="100"
              />
              <p className="text-xs text-gray-500 mt-1">Storage capacity in GB</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Transfer (GB)
              </label>
              <input
                type="number"
                value={usage.dataTransfer}
                onChange={(e) => setUsage({...usage, dataTransfer: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="500"
              />
              <p className="text-xs text-gray-500 mt-1">Monthly data transfer</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instances
              </label>
              <input
                type="number"
                value={usage.instances}
                onChange={(e) => setUsage({...usage, instances: parseInt(e.target.value) || 1})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1"
              />
              <p className="text-xs text-gray-500 mt-1">Number of instances</p>
            </div>
          </div>
        </div>

        {/* Comparison Results */}
        <div className="space-y-6">
          {serviceComparisons[selectedCategory]?.map((comparison, index) => {
            const bestValue = getBestValue(comparison);
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{comparison.service}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Best Value: <span className="font-semibold ml-1 text-green-600">{bestValue.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                  {Object.entries(comparison).slice(1).map(([provider, details]) => {
                    const monthlyCost = calculateMonthlyCost(details.price, selectedCategory);
                    const isBestValue = provider === bestValue;
                    
                    return (
                      <div 
                        key={provider} 
                        className={`p-6 border-r border-gray-200 last:border-r-0 relative ${
                          isBestValue ? 'bg-green-50 border-green-200' : ''
                        }`}
                      >
                        {isBestValue && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            BEST VALUE
                          </div>
                        )}
                        
                        <div className="text-center mb-4">
                          <div className={`w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-3 text-2xl ${
                            provider === 'aws' ? 'bg-orange-100' :
                            provider === 'azure' ? 'bg-blue-100' :
                            provider === 'gcp' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {getProviderLogo(provider)}
                          </div>
                          <h4 className="font-semibold text-gray-900 capitalize text-lg">{provider}</h4>
                        </div>
                        
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-gray-900">
                            ${details.price}
                          </div>
                          <div className="text-sm text-gray-500">{details.unit}</div>
                          <div className="text-xl font-semibold text-blue-600 mt-2">
                            ${monthlyCost.toFixed(2)}/month
                          </div>
                        </div>
                        
                        <ul className="text-sm text-gray-600 space-y-2">
                          {details.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <button
                          onClick={() => setShowDetails(showDetails === `${provider}-${index}` ? null : `${provider}-${index}`)}
                          className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                          {showDetails === `${provider}-${index}` ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Monthly Cost Estimate Summary</h3>
              <p className="opacity-90">Based on your current configuration</p>
            </div>
            <Cloud className="w-12 h-12 opacity-80" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {serviceComparisons[selectedCategory] && (() => {
              const totalCosts = serviceComparisons[selectedCategory].reduce((acc, comparison) => {
                acc.aws += calculateMonthlyCost(comparison.aws.price, selectedCategory);
                acc.azure += calculateMonthlyCost(comparison.azure.price, selectedCategory);
                acc.gcp += calculateMonthlyCost(comparison.gcp.price, selectedCategory);
                acc.oracle += calculateMonthlyCost(comparison.oracle.price, selectedCategory);
                return acc;
              }, { aws: 0, azure: 0, gcp: 0, oracle: 0 });

              return Object.entries(totalCosts).map(([provider, cost]) => (
                <div key={provider} className="text-center">
                  <div className="text-2xl font-bold">${cost.toFixed(2)}</div>
                  <div className="text-sm opacity-80 capitalize">{provider} Total</div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
