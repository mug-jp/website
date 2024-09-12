export default function LayoutFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="p-10 flex justify-center items-center text-sm">
            <span>©︎ 2023-{currentYear} MapLibre User Group Japan</span>
        </footer>
    );
}
