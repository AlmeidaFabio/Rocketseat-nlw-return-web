import BugImg from '../../assets/Bug.svg';
import IdeaImg from '../../assets/Idea.svg';
import thoughImg from '../../assets/Thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source:BugImg,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source:IdeaImg,
            alt: 'Imagem de uma lãmpada'
        }
    },
    OTHER: {
        title:'Outro',
        image: {
            source: thoughImg,
            alt: 'Imagem de um balão de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [ feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null);
    const [ feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ):(
                <>
                        {!feedbackType ? (
                    <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
                ):(
                    <FeedbackContentStep 
                    feedbackType={feedbackType}
                    onFeedbackRestartRequested={handleRestartFeedback}
                    onFeedbackSent={() => setFeedbackSent(true)}
                    />
                )}
                    </>
            )}
            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}