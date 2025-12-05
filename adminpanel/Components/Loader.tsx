import { Loader2 } from 'lucide-react'
import { memo } from 'react'


const Loader = memo(() => {
  return <Loader2 className="animate-spin w-5 h-5 mr-2" />
})

export default Loader
