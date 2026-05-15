export function currencyFormatter(amount: number) {
    const formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 2
    });
    return "$" +  formatter.format(amount);
}