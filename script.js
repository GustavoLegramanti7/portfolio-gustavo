const botaoMenu = document.querySelector('.botao-menu');
const menu = document.querySelector('.menu');
const linksMenu = document.querySelectorAll('.menu a');
const secoes = document.querySelectorAll('main section[id]');
const formulario = document.querySelector('#formulario-contato');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.classList.toggle('aberto', aberto);
  botaoMenu.setAttribute('aria-expanded', String(aberto));
});

linksMenu.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botaoMenu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
  });
});

function atualizarLinkAtivo() {
  let secaoAtual = '';

  secoes.forEach((secao) => {
    const limite = secao.offsetTop - 140;
    if (window.scrollY >= limite) {
      secaoAtual = secao.id;
    }
  });

  linksMenu.forEach((link) => {
    link.classList.toggle('ativo', link.getAttribute('href') === `#${secaoAtual}`);
  });
}

window.addEventListener('scroll', atualizarLinkAtivo, { passive: true });
atualizarLinkAtivo();

document.querySelector('#ano-atual').textContent = new Date().getFullYear();

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const campos = [...formulario.querySelectorAll('input, textarea')];
  let formularioValido = true;

  campos.forEach((campo) => {
    const vazio = campo.value.trim() === '';
    const emailInvalido = campo.type === 'email' && !/^\S+@\S+\.\S+$/.test(campo.value);
    const invalido = vazio || emailInvalido;

    campo.classList.toggle('erro', invalido);
    formularioValido = formularioValido && !invalido;
  });

  if (!formularioValido) {
    mensagemFormulario.textContent = 'Revise os campos destacados antes de enviar.';
    return;
  }

  mensagemFormulario.textContent = 'Mensagem validada com sucesso! Obrigado pelo contato.';
  formulario.reset();
});
