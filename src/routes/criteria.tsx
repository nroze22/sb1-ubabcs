import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CriteriaForm } from "@/components/criteria-form";

export const Route = createFileRoute('/criteria')({
  component: CriteriaPage
});

function CriteriaPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container max-w-5xl px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Define Screening Criteria</h1>
        <p className="text-muted-foreground">
          Set your inclusion and exclusion criteria for patient screening
        </p>
      </div>
      <CriteriaForm />
    </motion.div>
  );
}