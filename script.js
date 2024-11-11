function buscarEndereco() {
    const cep = document.getElementById('cep').value;
    const erroMsg = document.getElementById('erro');

    if (cep.length !== 8 || isNaN(cep)) {
        erroMsg.textContent = "CEP inválido. Verifique e tente novamente.";
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                erroMsg.textContent = "CEP não encontrado. Verifique e tente novamente.";
                return;
            }

            document.getElementById('cidade').value = data.localidade;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('UF').value = data.uf;
            document.getElementById('rua').value = data.logradouro;
            erroMsg.textContent = ''; // Limpar mensagens de erro se sucesso
        })
        .catch(error => {
            erroMsg.textContent = "Erro ao buscar o endereço. Tente novamente mais tarde.";
            console.error(error);
        });
}