'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import sysOpsBadge from '/public/sysopas.png';

// Import question arrays
import { sysOpsMonitoringLogging } from '@/questions/sysops-administrator-associate/1-monitoring-logging/1.1';
import { sysOpsRemediation } from '@/questions/sysops-administrator-associate/1-monitoring-logging/1.2';
import { sysOpsScalabilityElasticity } from '@/questions/sysops-administrator-associate/2-reliability-and-business-continuity/2.1';
import { sysOpsHighAvailability } from '@/questions/sysops-administrator-associate/2-reliability-and-business-continuity/2.2';
import { sysOpsBackupRestore } from '@/questions/sysops-administrator-associate/2-reliability-and-business-continuity/2.3';
import { sysOpsProvisioning } from '@/questions/sysops-administrator-associate/3-deployment-provisioning-automation/3.1';
import { sysOpsAutomation } from '@/questions/sysops-administrator-associate/3-deployment-provisioning-automation/3.2';
import { sysOpsSecurityCompliance } from '@/questions/sysops-administrator-associate/4-security-compliance/4.1';
import { sysOpsDataProtection } from '@/questions/sysops-administrator-associate/4-security-compliance/4.2';
import { sysOpsNetworkingConnectivity } from '@/questions/sysops-administrator-associate/5-networking-content-delivery/5.1';
import { sysOpsDNSContentDelivery } from '@/questions/sysops-administrator-associate/5-networking-content-delivery/5.2';
import { sysOpsNetworkTroubleshooting } from '@/questions/sysops-administrator-associate/5-networking-content-delivery/5.3';
import { sysOpsCostOptimization } from '@/questions/sysops-administrator-associate/6-cost-performance-optimization/6.1';
import { sysOpsPerformanceOptimization } from '@/questions/sysops-administrator-associate/6-cost-performance-optimization/6.2';

export default function SysOpsAdministratorOverview() {
    const router = useRouter();

    // Calculate the number of questions per subdomain and domain
    const monitoringLoggingCount = sysOpsMonitoringLogging.length + sysOpsRemediation.length;
    const reliabilityContinuityCount = sysOpsScalabilityElasticity.length + sysOpsHighAvailability.length + sysOpsBackupRestore.length;
    const provisioningAutomationCount = sysOpsProvisioning.length + sysOpsAutomation.length;
    const securityComplianceCount = sysOpsSecurityCompliance.length + sysOpsDataProtection.length;
    const networkingConnectivityCount = sysOpsNetworkingConnectivity.length + sysOpsDNSContentDelivery.length + sysOpsNetworkTroubleshooting.length;
    const costOptimizationCount = sysOpsCostOptimization.length + sysOpsPerformanceOptimization.length;

    const handleStartQuiz = () => {
        router.push('/sysops-administrator-associate/quiz');
    };

    return (
        <section className="py-8 text-white">
            <div className="container mx-auto px-4">
                {/* Badge and Header Section */}
                <div className="max-w-3xl mx-auto bg-gray-800 p-6 shadow-lg rounded-lg text-center">
                    <Image
                        src={sysOpsBadge}
                        alt="AWS SysOps Administrator Badge"
                        width={100}
                        height={100}
                        className="mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-white mb-2">
                        AWS SysOps Administrator Quiz Overview
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Prepare for the AWS Certified SysOps Administrator exam by tackling questions specifically designed to simulate the real test experience.
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleStartQuiz}
                        className="p-3 bg-blue-700 text-white w-48 font-bold rounded-lg hover:bg-blue-700"
                    >
                        Start Quiz
                    </button>
                </div>

                {/* Overview Content Section */}
                <div className="max-w-3xl mx-auto bg-white text-gray-800 p-6 shadow-lg rounded-lg mt-8">
                    <h2 className="text-xl font-semibold mb-4">Quiz Breakdown</h2>

                    {/* Monitoring, Logging, and Remediation */}
                    <h3 className="text-lg font-semibold mb-2">1. Monitoring, Logging, and Remediation</h3>
                    <p className="text-gray-700 mb-4">
                        Expect {monitoringLoggingCount} questions:
                    </p>
                    <ul className="list-disc ml-5 text-gray-700 mb-4">
                        <li><strong>Monitoring and Logging:</strong> ({sysOpsMonitoringLogging.length})</li>
                        <li><strong>Remediation:</strong> ({sysOpsRemediation.length})</li>
                    </ul>

                    {/* Reliability and Business Continuity */}
                    <h3 className="text-lg font-semibold mb-2">2. Reliability and Business Continuity</h3>
                    <p className="text-gray-700 mb-4">
                        Expect {reliabilityContinuityCount} questions:
                    </p>
                    <ul className="list-disc ml-5 text-gray-700 mb-4">
                        <li><strong>Scalability and Elasticity:</strong> ({sysOpsScalabilityElasticity.length})</li>
                        <li><strong>High Availability:</strong> ({sysOpsHighAvailability.length})</li>
                        <li><strong>Backup and Restore:</strong> ({sysOpsBackupRestore.length})</li>
                    </ul>

                    {/* Deployment, Provisioning, and Automation */}
                    <h3 className="text-lg font-semibold mb-2">3. Deployment, Provisioning, and Automation</h3>
                    <p className="text-gray-700 mb-4">
                        Expect {provisioningAutomationCount} questions:
                    </p>
                    <ul className="list-disc ml-5 text-gray-700 mb-4">
                        <li><strong>Provisioning:</strong> ({sysOpsProvisioning.length})</li>
                        <li><strong>Automation:</strong> ({sysOpsAutomation.length})</li>
                    </ul>

                    {/* Security and Compliance */}
                    <h3 className="text-lg font-semibold mb-2">4. Security and Compliance</h3>
                    <p className="text-gray-700 mb-4">
                        Expect {securityComplianceCount} questions:
                    </p>
                    <ul className="list-disc ml-5 text-gray-700 mb-4">
                        <li><strong>Security and Compliance:</strong> ({sysOpsSecurityCompliance.length})</li>
                        <li><strong>Data Protection:</strong> ({sysOpsDataProtection.length})</li>
                    </ul>

                    {/* Networking and Content Delivery */}
                    <h3 className="text-lg font-semibold mb-2">5. Networking and Content Delivery</h3>
                    <p className="text-gray-700 mb-4">
                        Expect {networkingConnectivityCount} questions:
                    </p>
                    <ul className="list-disc ml-5 text-gray-700 mb-4">
                        <li><strong>Networking and Connectivity:</strong> ({sysOpsNetworkingConnectivity.length})</li>
                        <li><strong>DNS and Content Delivery:</strong> ({sysOpsDNSContentDelivery.length})</li>
                        <li><strong>Network Troubleshooting:</strong> ({sysOpsNetworkTroubleshooting.length})</li>
                    </ul>

                    {/* Cost and Performance Optimization */}
                    <h3 className="text-lg font-semibold mb-2">6. Cost and Performance Optimization</h3>
                    <p className="text-gray-700 mb-4">
                        Expect {costOptimizationCount} questions:
                    </p>
                    <ul className="list-disc ml-5 text-gray-700 mb-4">
                        <li><strong>Cost Optimization:</strong> ({sysOpsCostOptimization.length})</li>
                        <li><strong>Performance Optimization:</strong> ({sysOpsPerformanceOptimization.length})</li>
                    </ul>

                    <p className="text-gray-700 text-center">
                        If you can pass this, you are ready!
                    </p>
                </div>
            </div>
        </section>
    );
}
