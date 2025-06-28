import React, { useState, useRef, useCallback } from 'react';
import { 
  Cloud, 
  Database, 
  Server, 
  Network, 
  Shield, 
  Monitor,
  Plus,
  Trash2,
  Download,
  Upload,
  Eye,
  Settings,
  Square
} from 'lucide-react';

interface Component {
  id: string;
  type: 'compute' | 'storage' | 'database' | 'network' | 'security' | 'analytics';
  service: string;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  connections: string[];
  properties: Record<string, string | number>;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'data-flow' | 'api-call' | 'sync' | 'async';
  label?: string;
}

interface ArchitectureDiagram {
  id: string;
  name: string;
  description: string;
  components: Component[];
  connections: Connection[];
  metadata: {
    provider: 'aws' | 'azure' | 'gcp';
    estimatedCost: number;
    lastModified: Date;
  };
}

interface ServiceConfig {
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const ArchitectureDesigner: React.FC = () => {
  const [diagram, setDiagram] = useState<ArchitectureDiagram>({
    id: 'new-diagram',
    name: 'New Architecture',
    description: 'Drag components to design your cloud architecture',
    components: [],
    connections: [],
    metadata: {
      provider: 'aws',
      estimatedCost: 0,
      lastModified: new Date()
    }
  });

  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Available AWS services for dragging
  const awsServices = {
    compute: [
      { type: 'EC2', icon: Server, color: 'bg-orange-100 border-orange-300' },
      { type: 'Lambda', icon: Square, color: 'bg-yellow-100 border-yellow-300' },
      { type: 'ECS', icon: Server, color: 'bg-blue-100 border-blue-300' },
      { type: 'EKS', icon: Server, color: 'bg-purple-100 border-purple-300' }
    ],
    storage: [
      { type: 'S3', icon: Database, color: 'bg-green-100 border-green-300' },
      { type: 'EBS', icon: Database, color: 'bg-red-100 border-red-300' },
      { type: 'EFS', icon: Database, color: 'bg-indigo-100 border-indigo-300' }
    ],
    database: [
      { type: 'RDS', icon: Database, color: 'bg-blue-100 border-blue-300' },
      { type: 'DynamoDB', icon: Database, color: 'bg-purple-100 border-purple-300' },
      { type: 'ElastiCache', icon: Database, color: 'bg-red-100 border-red-300' }
    ],
    network: [
      { type: 'VPC', icon: Network, color: 'bg-gray-100 border-gray-300' },
      { type: 'ALB', icon: Network, color: 'bg-blue-100 border-blue-300' },
      { type: 'CloudFront', icon: Network, color: 'bg-orange-100 border-orange-300' },
      { type: 'API Gateway', icon: Network, color: 'bg-green-100 border-green-300' }
    ],
    security: [
      { type: 'IAM', icon: Shield, color: 'bg-red-100 border-red-300' },
      { type: 'WAF', icon: Shield, color: 'bg-orange-100 border-orange-300' },
      { type: 'KMS', icon: Shield, color: 'bg-yellow-100 border-yellow-300' }
    ],
    analytics: [
      { type: 'CloudWatch', icon: Monitor, color: 'bg-blue-100 border-blue-300' },
      { type: 'Kinesis', icon: Monitor, color: 'bg-purple-100 border-purple-300' },
      { type: 'EMR', icon: Monitor, color: 'bg-green-100 border-green-300' }
    ]
  };

  const handleDragStart = useCallback((service: ServiceConfig, category: string) => {
    const newComponent: Component = {
      id: `${service.type}-${Date.now()}`,
      type: category as Component['type'],
      service: service.type,
      name: service.type,
      position: { x: 0, y: 0 },
      size: { width: 120, height: 80 },
      connections: [],
      properties: {}
    };
    setDraggedComponent(newComponent);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newComponent = {
      ...draggedComponent,
      position: { x, y }
    };

    setDiagram(prev => ({
      ...prev,
      components: [...prev.components, newComponent],
      metadata: { ...prev.metadata, lastModified: new Date() }
    }));

    setDraggedComponent(null);
  }, [draggedComponent]);

  const handleComponentClick = useCallback((component: Component) => {
    setSelectedComponent(component);
  }, []);

  const handleComponentMove = useCallback((componentId: string, newPosition: { x: number; y: number }) => {
    setDiagram(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === componentId ? { ...comp, position: newPosition } : comp
      )
    }));
  }, []);

  const deleteComponent = useCallback((componentId: string) => {
    setDiagram(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== componentId),
      connections: prev.connections.filter(conn => 
        conn.from !== componentId && conn.to !== componentId
      )
    }));
    setSelectedComponent(null);
  }, []);

  const startConnection = useCallback((componentId: string) => {
    setIsConnecting(true);
    setConnectionStart(componentId);
  }, []);

  const completeConnection = useCallback((targetId: string) => {
    if (!connectionStart || connectionStart === targetId) {
      setIsConnecting(false);
      setConnectionStart(null);
      return;
    }

    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      from: connectionStart,
      to: targetId,
      type: 'data-flow',
      label: 'Data Flow'
    };

    setDiagram(prev => ({
      ...prev,
      connections: [...prev.connections, newConnection]
    }));

    setIsConnecting(false);
    setConnectionStart(null);
  }, [connectionStart]);

  const exportDiagram = useCallback(() => {
    const dataStr = JSON.stringify(diagram, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${diagram.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [diagram]);

  const importDiagram = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedDiagram = JSON.parse(e.target?.result as string);
        setDiagram(importedDiagram);
      } catch (error) {
        console.error('Error importing diagram:', error);
        alert('Error importing diagram. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }, []);

  const generateCode = useCallback(() => {
    // Generate CloudFormation template based on the diagram
    const template: Record<string, unknown> = {
      AWSTemplateFormatVersion: '2010-09-09',
      Description: diagram.description,
      Resources: {} as Record<string, unknown>
    };

    diagram.components.forEach(component => {
      const resourceName = component.name.replace(/[^a-zA-Z0-9]/g, '');
      const resources = template.Resources as Record<string, unknown>;
      
      switch (component.service) {
        case 'EC2':
          resources[resourceName] = {
            Type: 'AWS::EC2::Instance',
            Properties: {
              InstanceType: 't3.micro',
              ImageId: 'ami-0abcdef1234567890'
            }
          };
          break;
        case 'S3':
          resources[resourceName] = {
            Type: 'AWS::S3::Bucket',
            Properties: {
              BucketName: component.name.toLowerCase()
            }
          };
          break;
        case 'RDS':
          resources[resourceName] = {
            Type: 'AWS::RDS::DBInstance',
            Properties: {
              DBInstanceClass: 'db.t3.micro',
              Engine: 'mysql'
            }
          };
          break;
        // Add more service types as needed
      }
    });

    return JSON.stringify(template, null, 2);
  }, [diagram]);

  const renderComponent = (component: Component) => {
    const serviceConfig = Object.values(awsServices)
      .flat()
      .find(s => s.type === component.service);
    
    const IconComponent = serviceConfig?.icon || Server;
    const colorClass = serviceConfig?.color || 'bg-gray-100 border-gray-300';

    return (
      <div
        key={component.id}
        className={`absolute border-2 rounded-lg p-3 cursor-pointer transition-all ${colorClass} ${
          selectedComponent?.id === component.id ? 'ring-2 ring-blue-500' : ''
        } ${isConnecting && connectionStart !== component.id ? 'hover:ring-2 hover:ring-green-500' : ''}`}
        style={{
          left: component.position.x,
          top: component.position.y,
          width: component.size.width,
          height: component.size.height
        }}
        onClick={() => {
          if (isConnecting) {
            completeConnection(component.id);
          } else {
            handleComponentClick(component);
          }
        }}
        onMouseDown={(e) => {
          if (isConnecting) return;
          
          const startX = e.clientX - component.position.x;
          const startY = e.clientY - component.position.y;

          const handleMouseMove = (e: MouseEvent) => {
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            handleComponentMove(component.id, { x: newX, y: newY });
          };

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <IconComponent className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium text-center">{component.name}</span>
        </div>
        
        {selectedComponent?.id === component.id && (
          <div className="absolute -top-8 -right-8 flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                startConnection(component.id);
              }}
              className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600"
              title="Connect"
            >
              <Plus className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(component.id);
              }}
              className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderConnection = (connection: Connection) => {
    const fromComponent = diagram.components.find(c => c.id === connection.from);
    const toComponent = diagram.components.find(c => c.id === connection.to);

    if (!fromComponent || !toComponent) return null;

    const fromX = fromComponent.position.x + fromComponent.size.width / 2;
    const fromY = fromComponent.position.y + fromComponent.size.height / 2;
    const toX = toComponent.position.x + toComponent.size.width / 2;
    const toY = toComponent.position.y + toComponent.size.height / 2;

    return (
      <svg
        key={connection.id}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        <line
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Cloud className="w-8 h-8 mr-3 text-blue-600" />
          Architecture Designer
        </h1>
        <p className="text-lg text-gray-600">
          Design your cloud architecture visually with drag-and-drop components.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Service Palette */}
        <div className="col-span-3">
          <div className="bg-white border rounded-lg p-4 h-fit">
            <h3 className="font-semibold text-gray-900 mb-4">AWS Services</h3>
            
            {Object.entries(awsServices).map(([category, services]) => (
              <div key={category} className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                  {category}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <div
                        key={service.type}
                        draggable
                        onDragStart={() => handleDragStart(service, category)}
                        className={`${service.color} border-2 rounded p-2 cursor-move hover:shadow-md transition-all`}
                      >
                        <div className="flex flex-col items-center">
                          <IconComponent className="w-4 h-4 mb-1" />
                          <span className="text-xs font-medium text-center">
                            {service.type}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="bg-white border rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
            <div className="space-y-2">
              <button
                onClick={exportDiagram}
                className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              
              <label className="w-full flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importDiagram}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  const code = generateCode();
                  navigator.clipboard.writeText(code);
                  alert('CloudFormation template copied to clipboard!');
                }}
                className="w-full flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Generate Code
              </button>
            </div>
          </div>
        </div>

        {/* Design Canvas */}
        <div className="col-span-6">
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b px-4 py-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">{diagram.name}</h3>
                <p className="text-sm text-gray-600">{diagram.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {diagram.components.length} components
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {diagram.connections.length} connections
                </span>
              </div>
            </div>
            
            <div
              ref={canvasRef}
              className="relative bg-gray-50 overflow-auto"
              style={{ height: '600px' }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => {
                if (isConnecting) {
                  setIsConnecting(false);
                  setConnectionStart(null);
                }
                setSelectedComponent(null);
              }}
            >
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Render Connections */}
              {diagram.connections.map(renderConnection)}

              {/* Render Components */}
              {diagram.components.map(renderComponent)}

              {/* Connection Mode Indicator */}
              {isConnecting && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-2 rounded-lg">
                  Click on a target component to connect
                </div>
              )}

              {/* Empty State */}
              {diagram.components.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Cloud className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Start designing</p>
                    <p className="text-sm">Drag AWS services from the left panel to begin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="col-span-3">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Properties
            </h3>
            
            {selectedComponent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.name}
                    onChange={(e) => {
                      const updatedComponent = { ...selectedComponent, name: e.target.value };
                      setSelectedComponent(updatedComponent);
                      setDiagram(prev => ({
                        ...prev,
                        components: prev.components.map(comp =>
                          comp.id === selectedComponent.id ? updatedComponent : comp
                        )
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.service}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.type}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      X Position
                    </label>
                    <input
                      type="number"
                      value={Math.round(selectedComponent.position.x)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Y Position
                    </label>
                    <input
                      type="number"
                      value={Math.round(selectedComponent.position.y)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Connections
                  </label>
                  <div className="text-sm text-gray-600">
                    {diagram.connections.filter(conn => 
                      conn.from === selectedComponent.id || conn.to === selectedComponent.id
                    ).length} connections
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a component to view properties</p>
              </div>
            )}
          </div>

          {/* Architecture Summary */}
          <div className="bg-white border rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Components:</span>
                <span className="font-medium">{diagram.components.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Connections:</span>
                <span className="font-medium">{diagram.connections.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium uppercase">{diagram.metadata.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Modified:</span>
                <span className="font-medium">
                  {diagram.metadata.lastModified.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Validation Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          Architecture Best Practices
        </h4>
        <div className="text-sm text-blue-700 space-y-2">
          <p>• <strong>High Availability:</strong> Deploy across multiple Availability Zones</p>
          <p>• <strong>Security:</strong> Use VPC, security groups, and IAM roles</p>
          <p>• <strong>Scalability:</strong> Include auto scaling and load balancers</p>
          <p>• <strong>Cost Optimization:</strong> Right-size instances and use reserved capacity</p>
          <p>• <strong>Monitoring:</strong> Add CloudWatch and logging components</p>
          <p>• <strong>Backup & Recovery:</strong> Plan for disaster recovery scenarios</p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDesigner;
