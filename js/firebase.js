// Início: Configuração do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBZQpNf1eqdegfdpsKqCtBY7d1uqGvoqaw",
    authDomain: "site-comentarios.firebaseapp.com", 
    databaseURL: "https://site-comentarios-default-rtdb.firebaseio.com", 
    projectId: "rota-amazonica",  
    storageBucket: "site-comentarios.appspot.com",  
    messagingSenderId: "889924285258",
    appId: "1:889924285258:web:5473e31336d6be033447b3",
    measurementId: "G-4YW9RWTL71"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
const database = getDatabase(app);

// Função para salvar um comentário
function salvarComentario(idPonto) {
    const nome = document.getElementById(`nome-${idPonto}`).value;
    const comentario = document.getElementById(`comentario-${idPonto}`).value;

    console.log(nome, comentario);

    if (!nome || !comentario) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const comentariosRef = ref(database, `comentarios/${idPonto}`);
    const novoComentarioRef = push(comentariosRef);

    set(novoComentarioRef, {
        nome: nome,
        comentario: comentario,
    }).then(() => {
        alert("Comentário enviado com sucesso!");
        carregarComentarios(idPonto); // Chama a função para carregar os comentários após salvar
    }).catch((error) => {
        console.error("Erro ao salvar comentário: ", error);
    });
}

// Função para carregar os comentários
function carregarComentarios(idPonto) {
    const comentariosRef = ref(database, `comentarios/${idPonto}`);
    const comentariosDiv = document.getElementById(`comentarios-${idPonto}`);

    onValue(comentariosRef, (snapshot) => {
        comentariosDiv.innerHTML = ""; // Limpa a área antes de renderizar
        const dados = snapshot.val();
        console.log(dados);

        if (dados) {
            Object.values(dados).forEach(({ nome, comentario }) => {
                const item = document.createElement("p");
                item.textContent = `${nome}: ${comentario}`;
                comentariosDiv.appendChild(item);
            });
        } else {
            comentariosDiv.innerHTML = "<p>Seja o primeiro a comentar!</p>";
        }
    });
}