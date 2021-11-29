export const getTicker = async () => {
    const res = await fetch('/api/gfinance');
    return await res.json();
}