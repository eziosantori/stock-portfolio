export const getPortfolio = async () => {
    const res = await fetch('/api/portfolio');
    return await res.json();
}