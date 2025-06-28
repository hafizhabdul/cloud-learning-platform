import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingDown, Info, CheckCircle, BarChart3, PieChart } from 'lucide-react';

interface ServiceCost {
  service: string;
  category: string;
  configuration: {
    [key: string]: string | number;
  };
  monthlyCost: number;
  yearlyDiscount?: number;
}

interface OptimizationRecommendation {
  id: string;
  type: 'cost-saving' | 'performance' | 'security' | 'reliability';
  title: string;
  description: string;
  potentialSavings: number;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'moderate' | 'complex';
  category: string;
}

interface CostAnalytics {
  breakdown: {
    compute: number;
    storage: number;
    network: number;
    database: number;
    other: number;
  };
  trends: {
    month: string;
    cost: number;
  }[];
  topExpenses: ServiceCost[];
}

interface CostCalculation {
  totalMonthlyCost: number;
  totalYearlyCost: number;
  totalWithReserved: number;
  savingsOpportunity: number;
  services: ServiceCost[];
  recommendations: OptimizationRecommendation[];
  analytics: CostAnalytics;
}

const CostCalculatorEnhanced: React.FC = () => {
  const [calculation, setCalculation] = useState<CostCalculation>({
    totalMonthlyCost: 0,
    totalYearlyCost: 0,
    totalWithReserved: 0,
    savingsOpportunity: 0,
    services: [],
    recommendations: [],
    analytics: {
      breakdown: { compute: 0, storage: 0, network: 0, database: 0, other: 0 },
      trends: [],
      topExpenses: []
    }
  });

  const [selectedService, setSelectedService] = useState<string>('ec2');
  const [serviceConfig, setServiceConfig] = useState<Record<string, string | number>>({});
  const [activeTab, setActiveTab] = useState<'calculator' | 'analytics' | 'recommendations'>('calculator');

  // AWS Service pricing (simplified estimates)
  const servicePricing = {
    ec2: {
      name: 'Amazon EC2',
      category: 'Compute',
      types: {
        't3.micro': { hourly: 0.0104, vcpu: 2, memory: 1 },
        't3.small': { hourly: 0.0208, vcpu: 2, memory: 2 },
        't3.medium': { hourly: 0.0416, vcpu: 2, memory: 4 },
        't3.large': { hourly: 0.0832, vcpu: 2, memory: 8 },
        'm5.large': { hourly: 0.096, vcpu: 2, memory: 8 },
        'm5.xlarge': { hourly: 0.192, vcpu: 4, memory: 16 }
      },
      reservedDiscount: 0.31
    },
    rds: {
      name: 'Amazon RDS',
      category: 'Database',
      types: {
        'db.t3.micro': { hourly: 0.017, vcpu: 2, memory: 1 },
        'db.t3.small': { hourly: 0.034, vcpu: 2, memory: 2 },
        'db.m5.large': { hourly: 0.192, vcpu: 2, memory: 8 }
      },
      reservedDiscount: 0.38
    },
    lambda: {
      name: 'AWS Lambda',
      category: 'Compute',
      pricing: {
        requestCost: 0.0000002, // per request
        computeCost: 0.0000166667 // per GB-second
      },
      reservedDiscount: 0
    },
    s3: {
      name: 'Amazon S3',
      category: 'Storage',
      types: {
        standard: { perGB: 0.023 },
        ia: { perGB: 0.0125 },
        glacier: { perGB: 0.004 }
      },
      reservedDiscount: 0
    }
  };

  const addService = (): void => {
    let monthlyCost = 0;
    let yearlyDiscount = 0;

    // Calculate cost based on service type
    switch (selectedService) {
      case 'ec2': {
        const instanceType = serviceConfig.instanceType as string || 't3.micro';
        const instances = Number(serviceConfig.instances) || 1;
        const pricing = servicePricing.ec2.types[instanceType as keyof typeof servicePricing.ec2.types];
        if (pricing) {
          monthlyCost = pricing.hourly * 24 * 30 * instances;
          yearlyDiscount = servicePricing.ec2.reservedDiscount;
        }
        break;
      }

      case 'rds': {
        const dbInstanceType = serviceConfig.dbInstanceType as string || 'db.t3.micro';
        const dbInstances = Number(serviceConfig.dbInstances) || 1;
        const dbPricing = servicePricing.rds.types[dbInstanceType as keyof typeof servicePricing.rds.types];
        if (dbPricing) {
          monthlyCost = dbPricing.hourly * 24 * 30 * dbInstances;
          yearlyDiscount = servicePricing.rds.reservedDiscount;
        }
        break;
      }

      case 'lambda': {
        const monthlyRequests = Number(serviceConfig.monthlyRequests) || 1000000;
        const avgDuration = Number(serviceConfig.avgDuration) || 100;
        const memory = Number(serviceConfig.memory) || 128;
        
        const requestCost = monthlyRequests * servicePricing.lambda.pricing.requestCost;
        const computeSeconds = (monthlyRequests * avgDuration) / 1000;
        const gbSeconds = computeSeconds * (memory / 1024);
        const computeCost = gbSeconds * servicePricing.lambda.pricing.computeCost;
        
        monthlyCost = requestCost + computeCost;
        yearlyDiscount = 0;
        break;
      }

      case 's3': {
        const storageGB = Number(serviceConfig.storageGB) || 100;
        const storageClass = serviceConfig.storageClass as string || 'standard';
        const s3Pricing = servicePricing.s3.types[storageClass as keyof typeof servicePricing.s3.types];
        if (s3Pricing) {
          monthlyCost = storageGB * s3Pricing.perGB;
        }
        yearlyDiscount = 0;
        break;
      }
    }

    const newService: ServiceCost = {
      service: servicePricing[selectedService as keyof typeof servicePricing]?.name || selectedService,
      category: servicePricing[selectedService as keyof typeof servicePricing]?.category || 'Other',
      configuration: { ...serviceConfig },
      monthlyCost,
      yearlyDiscount
    };

    setCalculation(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));

    // Reset configuration
    setServiceConfig({});
  };

  const removeService = (index: number): void => {
    setCalculation(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  // Recalculate totals when services change
  useEffect(() => {
    const totalMonthlyCost = calculation.services.reduce((sum, service) => sum + service.monthlyCost, 0);
    const totalYearlyCost = totalMonthlyCost * 12;
    
    const totalWithReserved = calculation.services.reduce((sum, service) => {
      const yearlyCost = service.monthlyCost * 12;
      const discount = service.yearlyDiscount || 0;
      return sum + (yearlyCost * (1 - discount));
    }, 0);
    
    const savingsOpportunity = totalYearlyCost - totalWithReserved;

    setCalculation(prev => ({
      ...prev,
      totalMonthlyCost,
      totalYearlyCost,
      totalWithReserved,
      savingsOpportunity
    }));
  }, [calculation.services]);

  // Generate recommendations
  useEffect(() => {
    const generateRecommendations = (): OptimizationRecommendation[] => {
      const recommendations: OptimizationRecommendation[] = [];

      if (calculation.savingsOpportunity > 100) {
        recommendations.push({
          id: 'reserved-instances',
          type: 'cost-saving',
          title: 'Use Reserved Instances',
          description: 'Consider using Reserved Instances for your EC2 and RDS instances to save up to 35% on your monthly bill.',
          potentialSavings: calculation.savingsOpportunity,
          impact: 'high',
          effort: 'easy',
          category: 'Compute'
        });
      }

      if (calculation.services.some(s => s.category === 'Compute' && s.monthlyCost > 50)) {
        recommendations.push({
          id: 'right-sizing',
          type: 'performance',
          title: 'Right-Size Your Instances',
          description: 'Analyze your instance usage and resize them to better fit your workload requirements.',
          potentialSavings: calculation.totalMonthlyCost * 0.2,
          impact: 'medium',
          effort: 'moderate',
          category: 'Compute'
        });
      }

      recommendations.push({
        id: 'encryption',
        type: 'security',
        title: 'Enable Encryption at Rest',
        description: 'Enhance your data security by enabling encryption at rest for your S3 buckets and RDS instances.',
        potentialSavings: 0,
        impact: 'high',
        effort: 'easy',
        category: 'Security'
      });

      if (calculation.services.some(s => s.category === 'Database')) {
        recommendations.push({
          id: 'multi-az',
          type: 'reliability',
          title: 'Implement Multi-AZ Deployments',
          description: 'Increase the availability of your RDS instances by enabling Multi-AZ deployments.',
          potentialSavings: 0,
          impact: 'high',
          effort: 'moderate',
          category: 'Database'
        });
      }

      return recommendations;
    };

    setCalculation(prev => ({
      ...prev,
      recommendations: generateRecommendations()
    }));
  }, [calculation.services, calculation.savingsOpportunity, calculation.totalMonthlyCost]);

  // Generate analytics
  useEffect(() => {
    const breakdown = {
      compute: calculation.services.filter(s => s.category === 'Compute').reduce((sum, s) => sum + s.monthlyCost, 0),
      storage: calculation.services.filter(s => s.category === 'Storage').reduce((sum, s) => sum + s.monthlyCost, 0),
      network: calculation.services.filter(s => s.category === 'Network').reduce((sum, s) => sum + s.monthlyCost, 0),
      database: calculation.services.filter(s => s.category === 'Database').reduce((sum, s) => sum + s.monthlyCost, 0),
      other: calculation.services.filter(s => !['Compute', 'Storage', 'Network', 'Database'].includes(s.category)).reduce((sum, s) => sum + s.monthlyCost, 0)
    };

    const trends = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleDateString('en-US', { month: 'short' }),
      cost: calculation.totalMonthlyCost * (0.8 + Math.random() * 0.4)
    }));

    const topExpenses = calculation.services
      .sort((a, b) => b.monthlyCost - a.monthlyCost)
      .slice(0, 5);

    setCalculation(prev => ({
      ...prev,
      analytics: { breakdown, trends, topExpenses }
    }));
  }, [calculation.services, calculation.totalMonthlyCost]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getSavingsPercentage = (): number => {
    if (calculation.totalYearlyCost === 0) return 0;
    return (calculation.savingsOpportunity / calculation.totalYearlyCost) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Calculator className="w-8 h-8 mr-3 text-blue-600" />
          Enhanced AWS Cost Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Advanced cost estimation and optimization recommendations for your AWS infrastructure.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'calculator', label: 'Calculator', icon: Calculator },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'recommendations', label: 'Recommendations', icon: CheckCircle }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center ${
              activeTab === id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Service Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add AWS Service</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AWS Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="ec2">Amazon EC2</option>
                    <option value="rds">Amazon RDS</option>
                    <option value="lambda">AWS Lambda</option>
                    <option value="s3">Amazon S3</option>
                  </select>
                </div>

                {/* EC2 Configuration */}
                {selectedService === 'ec2' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instance Type
                      </label>
                      <select
                        value={serviceConfig.instanceType || 't3.micro'}
                        onChange={(e) => setServiceConfig({...serviceConfig, instanceType: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="t3.micro">t3.micro (2 vCPU, 1GB RAM)</option>
                        <option value="t3.small">t3.small (2 vCPU, 2GB RAM)</option>
                        <option value="t3.medium">t3.medium (2 vCPU, 4GB RAM)</option>
                        <option value="t3.large">t3.large (2 vCPU, 8GB RAM)</option>
                        <option value="m5.large">m5.large (2 vCPU, 8GB RAM)</option>
                        <option value="m5.xlarge">m5.xlarge (4 vCPU, 16GB RAM)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Instances
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={serviceConfig.instances || 1}
                        onChange={(e) => setServiceConfig({...serviceConfig, instances: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {/* RDS Configuration */}
                {selectedService === 'rds' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        DB Instance Type
                      </label>
                      <select
                        value={serviceConfig.dbInstanceType || 'db.t3.micro'}
                        onChange={(e) => setServiceConfig({...serviceConfig, dbInstanceType: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="db.t3.micro">db.t3.micro (2 vCPU, 1GB RAM)</option>
                        <option value="db.t3.small">db.t3.small (2 vCPU, 2GB RAM)</option>
                        <option value="db.m5.large">db.m5.large (2 vCPU, 8GB RAM)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of DB Instances
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={serviceConfig.dbInstances || 1}
                        onChange={(e) => setServiceConfig({...serviceConfig, dbInstances: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {/* Lambda Configuration */}
                {selectedService === 'lambda' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Requests
                      </label>
                      <input
                        type="number"
                        value={serviceConfig.monthlyRequests || 1000000}
                        onChange={(e) => setServiceConfig({...serviceConfig, monthlyRequests: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average Duration (ms)
                      </label>
                      <input
                        type="number"
                        value={serviceConfig.avgDuration || 100}
                        onChange={(e) => setServiceConfig({...serviceConfig, avgDuration: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Memory (MB)
                      </label>
                      <select
                        value={serviceConfig.memory || 128}
                        onChange={(e) => setServiceConfig({...serviceConfig, memory: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={128}>128 MB</option>
                        <option value={256}>256 MB</option>
                        <option value={512}>512 MB</option>
                        <option value={1024}>1024 MB</option>
                        <option value={2048}>2048 MB</option>
                      </select>
                    </div>
                  </>
                )}

                {/* S3 Configuration */}
                {selectedService === 's3' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Storage (GB)
                      </label>
                      <input
                        type="number"
                        value={serviceConfig.storageGB || 100}
                        onChange={(e) => setServiceConfig({...serviceConfig, storageGB: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Storage Class
                      </label>
                      <select
                        value={serviceConfig.storageClass || 'standard'}
                        onChange={(e) => setServiceConfig({...serviceConfig, storageClass: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="standard">Standard</option>
                        <option value="ia">Infrequent Access</option>
                        <option value="glacier">Glacier</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  onClick={addService}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(calculation.totalMonthlyCost)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Yearly Cost</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(calculation.totalYearlyCost)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">With Reserved</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(calculation.totalWithReserved)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Save {getSavingsPercentage().toFixed(1)}%
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Services List */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Added Services</h3>
              
              {calculation.services.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No services added yet. Add a service to see cost estimates.
                </p>
              ) : (
                <div className="space-y-4">
                  {calculation.services.map((service, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{service.service}</h4>
                            <span className="text-lg font-bold text-blue-600">
                              {formatCurrency(service.monthlyCost)}/month
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
                              {service.category}
                            </span>
                            {service.yearlyDiscount && (
                              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                {(service.yearlyDiscount * 100).toFixed(0)}% savings with Reserved
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeService(index)}
                          className="ml-4 text-red-600 hover:text-red-800 text-xl font-bold"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Cost Analytics
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cost Breakdown */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">Cost Breakdown by Category</h4>
              <div className="space-y-3">
                {Object.entries(calculation.analytics.breakdown).map(([category, cost]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(cost)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">Monthly Cost Trends</h4>
              <div className="h-32 flex items-center justify-center">
                <PieChart className="w-16 h-16 text-gray-300" />
                <p className="text-sm text-gray-500 ml-2">Chart visualization placeholder</p>
              </div>
            </div>
          </div>

          {/* Top Expenses */}
          {calculation.analytics.topExpenses.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-4">Top Expenses</h4>
              <div className="space-y-3">
                {calculation.analytics.topExpenses.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-800">{service.service}</span>
                      <span className="text-sm text-gray-600 ml-2">({service.category})</span>
                    </div>
                    <span className="font-bold text-gray-900">{formatCurrency(service.monthlyCost)}/month</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Optimization Recommendations
          </h3>
          
          {calculation.recommendations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Add some services to get optimization recommendations.
            </p>
          ) : (
            <div className="space-y-4">
              {calculation.recommendations.map((rec) => (
                <div key={rec.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          rec.type === 'cost-saving' ? 'bg-green-500' : 
                          rec.type === 'performance' ? 'bg-blue-500' : 
                          rec.type === 'security' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <div className="flex space-x-4 text-xs text-gray-500">
                        <span>💰 Savings: {formatCurrency(rec.potentialSavings)}</span>
                        <span>📊 Impact: {rec.impact}</span>
                        <span>⚡ Effort: {rec.effort}</span>
                        <span>📂 Category: {rec.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cost Optimization Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Cost Optimization Best Practices</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <p>• <strong>Monitor Regularly:</strong> Use AWS Cost Explorer and CloudWatch for real-time monitoring.</p>
              <p>• <strong>Right-Size Resources:</strong> Regularly review and adjust instance sizes based on actual usage.</p>
              <p>• <strong>Use Reserved Instances:</strong> Commit to reserved instances for predictable workloads to save up to 75%.</p>
              <p>• <strong>Implement Auto Scaling:</strong> Use auto scaling to match capacity with demand automatically.</p>
              <p>• <strong>Optimize Storage:</strong> Use appropriate storage classes and lifecycle policies for S3.</p>
              <p>• <strong>Review Data Transfer:</strong> Minimize data transfer costs by optimizing network architecture.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculatorEnhanced;
