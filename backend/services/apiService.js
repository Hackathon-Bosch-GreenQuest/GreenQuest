const API_BASE_URL = 'https://cinda-combustive-supersagaciously.ngrok-free.dev ';

/**
 * Tenta encontrar o usuário pelo nome. Se não encontrar, cadastra um novo.
 * @param {string} nome - O nome de usuário a ser buscado/criado.
 * @returns {object} O perfil completo do usuário.
 */
export const signInOrSignUpUser = async (nome) => {
    // 1. TENTA BUSCAR O USUÁRIO (Endpoint: /users?nome=...)
    let response = await fetch(`${API_BASE_URL}/users?nome=${nome}`);
    let users = await response.json();

    // Se a busca retornar um usuário, é LOGIN.
    if (users.length > 0) {
        // Encontramos o usuário, retorna o primeiro (deve ser único)
        return users[0]; 
    }

    // 2. SE NÃO ENCONTRAR NINGUÉM, FAZ O CADASTRO (POST)
    const novoUsuario = {
        // Criar um ID único é CRUCIAL, use o nome como ID ou crie um UUID
        // Para simplificar no hackathon, usaremos o próprio nome como ID
        id: nome.toLowerCase().replace(/\s/g, '_'), 
        nome: nome,
        pontuacaoTotal: 0,
        quizScore: 0,
    };

    response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
    });
    
    // Retorna o perfil recém-criado
    return response.json();
};

/**
 * Atualiza a pontuação do Quiz e o Total do Ranking, SÓ se for a melhor pontuação.
 * @param {string} userId - O ID do usuário (o nome de usuário, neste caso).
 * @param {number} newQuizScore - A pontuação recém-conquistada.
 * @returns {object} O perfil atualizado.
 */
export const updateQuizScoreAPI = async (userId, newQuizScore) => {
    // 1. BUSCAR O PERFIL ATUAL para pegar as pontuações antigas
    let response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const user = await response.json();

    const currentQuizScore = user.quizScore;
    const currentTotalScore = user.pontuacaoTotal;

    // 2. LÓGICA DE ATUALIZAÇÃO: SÓ CONTINUA SE A NOVA PONTUAÇÃO FOR MAIOR
    if (newQuizScore > currentQuizScore) {
        
        // Aplica o seu cálculo de Pontuação Total
        const newTotalScore = currentTotalScore - currentQuizScore + newQuizScore;
        
        // Objeto de dados a serem enviados no PATCH
        const updatedData = {
            quizScore: newQuizScore,
            pontuacaoTotal: newTotalScore,
        };

        // 3. ENVIAR A REQUISIÇÃO PATCH para atualizar o usuário
        const updateResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PATCH', // O PATCH é ideal para atualizar apenas ALGUNS campos
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!updateResponse.ok) {
            throw new Error("Falha ao salvar a pontuação na API.");
        }
        
        return updateResponse.json(); // Retorna o perfil com as pontuações atualizadas
        
    } else {
        // Se a nova pontuação não for a melhor, não faz nada
        return user;
    }
};

/**
 * Busca todos os usuários, ordena pela pontuação total (ranking) e retorna o Top 10.
 * @returns {Array} Uma lista dos 10 melhores perfis de usuário, ordenados.
 */
export const getTopRankingAPI = async () => {
    // 1. BUSCA TODOS OS USUÁRIOS (Endpoint: /users)
    // Usamos o endpoint de users, que contém pontuacaoTotal, e não o endpoint /ranking
    // porque o JSON Server não garante que o /ranking será atualizado
    const response = await fetch(`${API_BASE_URL}/users`);
    
    if (!response.ok) {
        throw new Error("Falha ao buscar dados do ranking na API.");
    }
    
    const users = await response.json();

    // 2. ORDENAÇÃO (FEITA NO FRONT-END, já que o JSON Server não faz ordenação avançada)
    // Sort() ordena pelo pontuacaoTotal de forma decrescente (b - a)
    const rankingOrdenado = users.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal);

    // 3. CORTAR: Retorna apenas os 10 primeiros
    return rankingOrdenado.slice(0, 10);
};