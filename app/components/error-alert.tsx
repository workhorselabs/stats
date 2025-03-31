import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

type ErrorAlertProps = {
  title?: string;
  message: string;
  className?: string;
};

export function ErrorAlert({
  title = "Unexpected Error",
  message,
  className = "",
}: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-5 w-5 text-destructive" />
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
}
