import { CircleAlert } from 'lucide-react';
import { FC, memo } from 'react';

interface ServerMsgProps {
    errorMsg: string;
}

const ServerMsg:FC<ServerMsgProps> = memo(({errorMsg}) => {
    return (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
            <span className="material-symbols-outlined mt-0.5 text-lg"><CircleAlert/></span>
            <p className="flex-1">{errorMsg}</p>
        </div>
    )
})

export default ServerMsg
