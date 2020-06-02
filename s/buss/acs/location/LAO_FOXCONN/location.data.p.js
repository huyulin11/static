import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { tool } from "/s/buss/acs/location/BASE/location.tool.js";
import { taskSiteLogic, taskSiteLocation, taskPath } from "/s/buss/acs/location/BASE/location.deal.js";

taskSiteLogic();
taskSiteLocation();
taskPath();

conf.domainYVal = [-1700, 100];
conf.domainXVal = [-100, 3000];