import ReactMarkdown from 'react-markdown';
import './MarkdownContent.css';

export default async function MarkdownContent({
    content,
}: {
    content: string;
}) {
    return (
        <div>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
