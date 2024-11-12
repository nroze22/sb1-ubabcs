import { motion } from 'framer-motion';
import { Brain, FileSearch, Filter, Upload } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Filter,
    title: 'Define Criteria',
    description:
      'Set precise inclusion and exclusion criteria with our intuitive builder.',
  },
  {
    icon: Upload,
    title: 'Upload Documents',
    description:
      'Easily upload patient records in various formats for AI analysis.',
  },
  {
    icon: FileSearch,
    title: 'Smart Screening',
    description:
      'Advanced AI analysis matches patients against your defined criteria.',
  },
];

export function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-12 max-w-5xl mx-auto">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">
          AI-Powered Patient Screening Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Streamline your clinical trial recruitment process with advanced AI
          technology and precise patient matching.
        </p>
        <Button size="lg" asChild>
          <Link to="/criteria">Get Started</Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 w-full">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative w-full aspect-video rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
          <div className="flex items-center justify-center h-full">
            <Brain className="h-24 w-24 text-primary/50" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}