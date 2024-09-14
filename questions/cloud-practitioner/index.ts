// questions/index.ts

import { cloudPractitionerCloudConceptsDefinition } from '@/questions/cloud-practitioner/1-cloud-concepts/1.1';
import { cloudPractitionerCloudEconomics } from '@/questions/cloud-practitioner/1-cloud-concepts/1.2';
import { cloudPractitionerCloudArchitecture } from '@/questions/cloud-practitioner/1-cloud-concepts/1.3';
import {
    cloudPractitionerSharedResponsibilityModel
} from '@/questions/cloud-practitioner/2-security-and-compliance/2.1';
import {
    cloudPractitionerSecurityComplianceConcepts
} from '@/questions/cloud-practitioner/2-security-and-compliance/2.2';
import { cloudPractitionerAccessManagement } from '@/questions/cloud-practitioner/2-security-and-compliance/2.3';
import {
    cloudPractitionerSecuritySupportResources
} from '@/questions/cloud-practitioner/2-security-and-compliance/2.4';
import { cloudPractitionerDeployingOperating } from '@/questions/cloud-practitioner/3-technology/3.1';
import { cloudPractitionerGlobalInfrastructure } from '@/questions/cloud-practitioner/3-technology/3.2';
import { cloudPractitionerCoreServices } from '@/questions/cloud-practitioner/3-technology/3.3';
import { cloudPractitionerTechnologySupportResources } from '@/questions/cloud-practitioner/3-technology/3.4';
import { cloudPractitionerPricingModels } from '@/questions/cloud-practitioner/4-billing-and-pricing/4.1';
import { cloudPractitionerAccountStructures } from '@/questions/cloud-practitioner/4-billing-and-pricing/4.2';
import { cloudPractitionerBillingSupportResources } from '@/questions/cloud-practitioner/4-billing-and-pricing/4.3';

// Combine all questions into one array
const cloudPractitionerQuestions = [
    ...cloudPractitionerCloudConceptsDefinition,
    ...cloudPractitionerCloudEconomics,
    ...cloudPractitionerCloudArchitecture,
    ...cloudPractitionerSharedResponsibilityModel,
    ...cloudPractitionerSecurityComplianceConcepts,
    ...cloudPractitionerAccessManagement,
    ...cloudPractitionerSecuritySupportResources,
    ...cloudPractitionerDeployingOperating,
    ...cloudPractitionerGlobalInfrastructure,
    ...cloudPractitionerCoreServices,
    ...cloudPractitionerTechnologySupportResources,
    ...cloudPractitionerPricingModels,
    ...cloudPractitionerAccountStructures,
    ...cloudPractitionerBillingSupportResources,
];

export default cloudPractitionerQuestions;
