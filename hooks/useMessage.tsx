import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  title: string;
  description?: string;
  action?: string;
  actionText?: string;
  duration?: number;
}
export function useMessage() {
  const { toast } = useToast();
  function message({
    title,
    description = "",
    duration = 3000,
    actionText = "",
  }: Props) {
    toast({
      description,
      title,
      action: actionText ? (
        <ToastAction altText="">{actionText}</ToastAction>
      ) : (
        <></>
      ),
      duration: duration,
    });
  }
  return { message };
}
