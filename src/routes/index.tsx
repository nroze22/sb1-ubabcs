import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Brain, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/')({
  component: LandingPage
});

function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold">AI-Powered Patient Screening</h1>
        <p className="text-xl text-muted-foreground">
          Transform your clinical trial recruitment with advanced AI that understands complex medical criteria.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/criteria">
          <Button size="lg" className="gap-2">
            Start Screening
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
      >
        <FeatureCard
          icon={Brain}
          title="AI Analysis"
          description="Advanced analysis of medical records"
        />
        <FeatureCard
          icon={FileText}
          title="Smart Matching"
          description="Precise criteria matching"
        />
        <FeatureCard
          icon={Sparkles}
          title="Instant Results"
          description="Real-time screening results"
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <Icon className="w-8 h-8 mb-4 text-primary" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}