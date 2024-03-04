import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "clear-archived-files",
  { minutes: 1 },
  internal.files.deleteFilePeriodically
);

export default crons;
