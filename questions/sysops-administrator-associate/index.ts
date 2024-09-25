// Cloud Practitioner Questions
import { sysOpsMonitoringLogging } from '@/questions/sysops-administrator-associate/1-monitoring-logging/1.1';
import { sysOpsRemediation } from '@/questions/sysops-administrator-associate/1-monitoring-logging/1.2';
import {
    sysOpsScalabilityElasticity
} from '@/questions/sysops-administrator-associate/2-reliability-and-business-continuity/2.1';
import {
    sysOpsHighAvailability
} from '@/questions/sysops-administrator-associate/2-reliability-and-business-continuity/2.2';
import {
    sysOpsBackupRestore
} from '@/questions/sysops-administrator-associate/2-reliability-and-business-continuity/2.3';
import {
    sysOpsProvisioning
} from '@/questions/sysops-administrator-associate/3-deployment-provisioning-automation/3.1';
import { sysOpsAutomation } from '@/questions/sysops-administrator-associate/3-deployment-provisioning-automation/3.2';
import { sysOpsSecurityCompliance } from '@/questions/sysops-administrator-associate/4-security-compliance/4.1';
import { sysOpsDataProtection } from '@/questions/sysops-administrator-associate/4-security-compliance/4.2';
import {
    sysOpsNetworkingConnectivity
} from '@/questions/sysops-administrator-associate/5-networking-content-delivery/5.1';
import { sysOpsDNSContentDelivery } from '@/questions/sysops-administrator-associate/5-networking-content-delivery/5.2';
import {
    sysOpsNetworkTroubleshooting
} from '@/questions/sysops-administrator-associate/5-networking-content-delivery/5.3';
import { sysOpsCostOptimization } from '@/questions/sysops-administrator-associate/6-cost-performance-optimization/6.1';
import {
    sysOpsPerformanceOptimization
} from '@/questions/sysops-administrator-associate/6-cost-performance-optimization/6.2';

const sysOpsAdministratorQuestions = [
    ...sysOpsMonitoringLogging,
    ...sysOpsRemediation,
    ...sysOpsScalabilityElasticity,
    ...sysOpsHighAvailability,
    ...sysOpsBackupRestore,
    ...sysOpsProvisioning,
    ...sysOpsAutomation,
    ...sysOpsSecurityCompliance,
    ...sysOpsDataProtection,
    ...sysOpsNetworkingConnectivity,
    ...sysOpsDNSContentDelivery,
    ...sysOpsNetworkTroubleshooting,
    ...sysOpsCostOptimization,
    ...sysOpsPerformanceOptimization
];

export default sysOpsAdministratorQuestions;
