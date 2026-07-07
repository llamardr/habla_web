"use client";

import { useEffect } from "react";
import { persistAnalyticsAttribution } from "../lib/googleAnalytics";

export default function AnalyticsAttributionTracker() {
  useEffect(() => {
    persistAnalyticsAttribution();
  }, []);

  return null;
}
