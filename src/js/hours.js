/* Espera o carregamento completo do DOM */
document.addEventListener('DOMContentLoaded', () => {
  
  /* Seleção de elementos do DOM */
  const body = document.body;
  const container = document.getElementById('conteiner');

  /* Definição de temas por período do dia - morning: manhã - afternoon: tarde - night: noite - madrugada: madrugada */
  const themes = {
    morning: { 
      body: 'linear-gradient(to bottom, #1E3C72, #0078bdff, #ffdd1aff)', 
      card: 'rgba(255, 255, 255, 0.55)', 
      claro: true 
    },
    afternoon: { 
      body: 'linear-gradient(to bottom, #ffbb00ff, #4d024dff, #1e0842ff', 
      card: 'rgba(255, 255, 255, 0.55)', 
      claro: true 
    },
    night: { 
      body: 'linear-gradient(to bottom, #1e0842ff, #020d4dff, #0b0018ff)', 
      card: 'rgba(255,255,255,0.1)', 
      claro: false 
    },
    madrugada: { 
      body: 'linear-gradient(to bottom, #0b0018ff, #020d4dff, #1E3C72)', 
      card: 'rgba(255,255,255,0.1)', 
      claro: false 
    }
  };

  /* Função para retornar o período do dia com base na hora local*/
  const getPeriod = hour => {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 23) return 'night';
    return 'madrugada';
  };

  /* Aplica o tema selecionado ao body e ao card - Mantém cores e fundo conforme o período*/
  applyTheme(themes[getPeriod(new Date().getHours())]);

});
