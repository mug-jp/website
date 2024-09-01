import './MarkdownContent.css';

export default async function MarkdownContent({
    htmlContent,
}: {
    htmlContent: string;
}) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
