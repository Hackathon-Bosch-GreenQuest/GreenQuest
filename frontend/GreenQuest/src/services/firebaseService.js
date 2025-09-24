import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const signUpUser = async (email, senha, nome_usuario) => {
    const credencialUsuario = await auth().createUserWithEmailAndPassword(email, senha);

    const user = credencialUsuario.user;
    const userId = credencialUsuario.user.uid;
    const userEmail = credencialUsuario.user.email;

    await user.updateProfile({ displayName: nome_usuario });

    await CriaPerfil(userId, nome_usuario, userEmail);

    return credencialUsuario.user;
};

export const CriaPerfil = (userId, nome_usuario, userEmail) => {
    return firestore().collection('users').doc(userId).set({
        nome: nome_usuario,
        email: userEmail,
        pontuacaoTotal: 0,
        quizScore: 0,
    });
};

export const signInUser = (email, senha) => {
    return auth().signInWithEmailAndPassword(email, senha);
};

export const atualizaPontuacaoQuiz = async (userId, novaPontuacaoQuiz) => {
    const userRef = firestore().collection('users').doc(userId);
    const rankingRef = firestore().collection('ranking').doc(userId);

    await firestore().runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists) {
            throw new Error("Documento do usuário não existe!");
        }

        const atualPontuacaoQuiz = userDoc.data().pontuacao_quiz || 0;
        const atualPontuacaoMax = userDoc.data().pontuacao_max || 0;

        if(novaPontuacaoQuiz > atualPontuacaoQuiz){
            const novaPontuacaoMax = atualPontuacaoMax - atualPontuacaoQuiz + novaPontuacaoQuiz;

            transaction.update(userRef, {
                pontuacao_quiz: novaPontuacaoQuiz,
                pontuacao_max: novaPontuacaoMax,
            });

            transaction.set(rankingRef, {
                nome: userDoc.data().nome,
                pontuacao_max: novaPontuacaoMax,
                dataUltimaAtualizado: firestore.FieldValue.serverTimeStamp(),
            });

            return true;
        }

        return false;
    });
};

export const getTopRanking = async () => {
    const ranking = [];
    const snapshot = await firestore().collection('ranking').orderBy('pontuacao_max', 'desc').limit(10).get();

    snapshot.forEach((doc) => {
        ranking.push({ id: doc.id, ...doc.data() });
    });

    return ranking;
};