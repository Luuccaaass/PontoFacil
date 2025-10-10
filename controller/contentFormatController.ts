import React from "react";

// Função para formatar data - Versão mais robusta
export const formatarData = (dataString: string): string => {
    try {
        // Adiciona o timezone para garantir que use o fuso horário local
        const data = new Date(dataString + 'T12:00:00'); // Meio-dia para evitar problemas de fuso

        // Verifica se a data é válida
        if (isNaN(data.getTime())) {
            console.warn('Data inválida:', dataString);
            return dataString;
        }

        const dia = data.getDate().toString().padStart(2, '0');
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const mes = meses[data.getMonth()];

        return `${dia} de ${mes}`;
    } catch (error) {
        console.error('Erro ao formatar data:', error, dataString);
        return dataString;
    }
};


// Função para formatar hora (remove segundos)
export const formatarHora = (horaString: string): string => {
    return horaString.substring(0, 5); // Pega apenas HH:MM
}; 

