
export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha.split('T')[0].split('-'));

    const opts = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opts);
}