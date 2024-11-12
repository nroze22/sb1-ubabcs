import { createFileRoute } from "@tanstack/react-router";
import { DocumentUpload } from "@/components/document-upload";
import { motion } from "framer-motion";

export const Route = createFileRoute('/upload')({
  component: UploadPage
});

function UploadPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Patient Documents</h1>
        <DocumentUpload />
      </div>
    </motion.div>
  );
}