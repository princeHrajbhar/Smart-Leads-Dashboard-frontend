// components/ExportButton.tsx

import { Download } from "lucide-react";

import { leadService } from "../../services/leadService";

const ExportButton = () => {
  const handleExport =
    async () => {
      try {
        await leadService.exportLeadsCSV();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <button
      onClick={
        handleExport
      }
      className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-90"
    >
      <Download
        className="h-4 w-4"
      />

      Export Leads
    </button>
  );
};

export default ExportButton;