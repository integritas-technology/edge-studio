import { Blocks } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusPage } from "../components/patterns/StatusPage";
import { Button } from "../components/ui/Button";

export function CustomPage() {
  const navigate = useNavigate();

  return (
    <StatusPage
      icon={Blocks}
      title="Coming soon"
      description="Build and manage custom modules — coming soon."
      action={
        <Button variant="primary" onClick={() => navigate("/dashboard")}>
          Back to dashboard
        </Button>
      }
    />
  );
}
