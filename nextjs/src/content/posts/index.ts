// Blog posts kept in the repo, extracted from the Framer CMS ("Newrsoom") before the site left Framer.
//
// LEGACY_POSTS: written directly in Framer, they exist nowhere else. They are always part of the blog.
// HUBSPOT_FALLBACK_POSTS: Framer's copies of posts that really live in HubSpot. They are used only when
//   HubSpot cannot be reached, and they also carry the fields HubSpot has no notion of (category,
//   featured flag, author picture and position), which src/lib/hubspot.ts layers onto the live post.
import clickupForConstructionProjectManagementASetupGuideForAustral from "./clickup-for-construction-project-management-a-setup-guide-for-australian-builders-and-contractors";
import howAutomationAlignsSalesOperationsAndFinance from "./how-automation-aligns-sales-operations-and-finance";
import howHubspotAndClickupHelpTeamsWorkSmarterNotHarder from "./how-hubspot-and-clickup-help-teams-work-smarter-not-harder";
import howShouldSmbsUseHubspotLifecycleStagesAndLeadStatusToDriveRe from "./how-should-smbs-use-hubspot-lifecycle-stages-and-lead-status-to-drive-revenue";
import howToChooseTheRightHubspotImplementationPartner from "./how-to-choose-the-right-hubspot-implementation-partner";
import hubspotMarketingContactsBestPracticesForSmbs from "./hubspot-marketing-contacts-best-practices-for-smbs";
import introducingOgLabsDigitalTransformationPartnerApac from "./introducing-og-labs-digital-transformation-partner-apac";
import letAiAgentsHandleTheBusyworkYourTeamHates from "./let-ai-agents-handle-the-busywork-your-team-hates";
import reclaimingTimeHowProcessAutomationFreesSmbTeams from "./reclaiming-time-how-process-automation-frees-smb-teams";
import whyApacRevenueTeamsAreStandardisingOnHubspot from "./why-apac-revenue-teams-are-standardising-on-hubspot";
import whyIntegratedSystemsBeatDisconnectedToolStacks from "./why-integrated-systems-beat-disconnected-tool-stacks";

export const LEGACY_POSTS = [
  howAutomationAlignsSalesOperationsAndFinance,
  howHubspotAndClickupHelpTeamsWorkSmarterNotHarder,
  introducingOgLabsDigitalTransformationPartnerApac,
  letAiAgentsHandleTheBusyworkYourTeamHates,
  reclaimingTimeHowProcessAutomationFreesSmbTeams,
  whyApacRevenueTeamsAreStandardisingOnHubspot,
  whyIntegratedSystemsBeatDisconnectedToolStacks,
];

export const HUBSPOT_FALLBACK_POSTS = [
  clickupForConstructionProjectManagementASetupGuideForAustral,
  howShouldSmbsUseHubspotLifecycleStagesAndLeadStatusToDriveRe,
  howToChooseTheRightHubspotImplementationPartner,
  hubspotMarketingContactsBestPracticesForSmbs,
];
