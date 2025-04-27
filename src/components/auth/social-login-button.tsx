import { Button } from "@/components/ui/button"
import { Github, Chrome } from "lucide-react"

interface SocialLoginButtonsProps {
  isLoading: boolean
}

export function SocialLoginButtons({ isLoading }: SocialLoginButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" disabled={isLoading} className="h-11">
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button variant="outline" disabled={isLoading} className="h-11">
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  )
}
