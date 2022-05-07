import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested:() => void;
    onFeedbackSent:() => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
    const [ screenshot, setScreenshot] = useState<string | null>(null);
    const [ comment, setComment ] = useState('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [ isSendingFeedback, setIsSendingFeedback ] = useState(false);

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);

        await api.post('/feedback', {
            type: feedbackType,
            comment,
            screenshot
        })

        onFeedbackSent();
    }

    return(
        <>
            <header>
                <button 
                    type="button" 
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6'/>
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea 
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder:text-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-violet-500 focus:ring-violet-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton onScreenshotTook={setScreenshot} screenshot={screenshot}/>
                    <button 
                    type="submit"
                    disabled={comment.length === 0 || isSendingFeedback }
                    className="p-2 bg-violet-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset=zinc-900 focus:ring-violet-500 transition-colors disabled:opacity-50 disabled:bg-violet-500"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>
                </footer>
            </form>
       </>
    )
}