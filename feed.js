(function buscarFeed() {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'feed', true)
    xhr.onreadystatechange = e => {
        if (xhr.readyState === 4) {
            if (!xhr.responseText == '') {
                const arrFeed = JSON.parse(xhr.responseText)
                paginarFeed(arrFeed)
            }
            else{
                paginaBranco()
            }
        }
    }
    xhr.send(null)
})()

function paginarFeed(arrFeed) {
    const conteudo = $('.conteudo')
    const arrPaginas = []
    const dadosPagina = new DadosPagina()
    dadosPagina.arrPaginas = arrPaginas
    conteudo.css({ "display": "flex", "flex-direction": "column-reverse", "align-items": "center" })
    if (arrFeed.length > 10) {
        const arrlength = arrFeed.length
        const matriz = []
        const ultimaPagina = arrlength % 10
        const arrUltimaPagina = arrFeed.slice(0, ultimaPagina)
        arrFeed.splice(0, ultimaPagina)
        matriz.push(arrUltimaPagina)
        while(arrFeed.length != 0) {
            let arrde10 = []
            arrde10 = arrFeed.slice(0, 10)
            arrFeed.splice(0, 10)
            matriz.push(arrde10)
        }
        for (let i = 0; i < matriz.length; i++) {
            const linkpagina = $('<a>').html(parseInt(i + 1))
            arrPaginas.push(linkpagina)
        }
        matriz.reverse()
        arrPaginas[0].addClass('selected')
        dadosPagina.matriz = matriz
        dadosPagina.conteudo = conteudo
        carregarFeed(dadosPagina.matriz[0], conteudo, dadosPagina)
        return true
    }
    carregarFeed(arrFeed, conteudo, dadosPagina)
}

function carregarFeed(arr, conteudo, dadosPagina) {
    conteudo.empty()
    arr.forEach(e => {
        const src = `userfiles/${e.nomeImagem}`
        const local = e.local || null
        const descricao = e.descricao || null
        const data = e.data

        const publicacao = $('<div>').addClass('publicacao')
        const img = $('<img>').attr('src', src).attr('overlay', '')
        publicacao.append(img)
        const dataPublicacao = $('<p>').append($('<i>').addClass('fa fa-calendar').attr('aria-hidden', 'true').html(' Data de publicação: '))
        dataPublicacao.append(' ' + data)
        publicacao.append(dataPublicacao)
        if (local) {
            const localPublicacao = $('<p>').append($('<i>').addClass('fa fa-map-marker').attr('aria-hidden', 'true').html(' Local: '))
            localPublicacao.append(' ' + local)
            publicacao.append(localPublicacao)
        }
        if (descricao) {
            const descricaoPublicacao = $('<p>').append($('<i>').addClass('fa fa-pencil').attr('aria-hidden', 'true').html(' Descrição: '))
            descricaoPublicacao.append(' ' + descricao)
            publicacao.append(descricaoPublicacao)
        }
        conteudo.append(publicacao)
    })
    dadosPagina.arrPaginas.length > 0 ? carregarPaginacao(dadosPagina) : false
    $("html, body").animate({ scrollTop: 0 }, 200);
    $.getScript('js/overlay.js')
}
function carregarPaginacao(dadosPagina) {
    const paginacaoMenu = $('<div>').addClass('paginacao')
    for (let i in dadosPagina.matriz) {
        dadosPagina.arrPaginas[i].attr('mypage', '').attr('href', '#')
        paginacaoMenu.append(dadosPagina.arrPaginas[i])
    }
    dadosPagina.conteudo.prepend(paginacaoMenu)
    dadosPagina.selecionada != null ? dadosPagina.arrPaginas[dadosPagina.selecionada].addClass('selected') : false
    $('[mypage]').each((i, e) => {
        $(e).on('click', e => {
            dadosPagina.arrPaginas.forEach(e => e.removeClass('selected'))
            dadosPagina.selecionada = i
            carregarFeed(dadosPagina.matriz[i], dadosPagina.conteudo, dadosPagina)
        })
    })
}

function paginaBranco() {
    const conteudo = $('.conteudo').css({ 'display': 'flex', 'flex-direction': 'column', "align-items": "center" })
    const frown = $('<i>').addClass('fa fa-frown-o fa-5x').attr('aria-hidden', 'true').addClass('textoaviso')
    const aviso = $('<p>').text('Ops! Parece que ainda não há fotos publicadas. Seja o primeiro a publicar!').addClass('textoaviso')
    conteudo.append(frown)
    conteudo.append(aviso)
}

function DadosPagina(matriz, arrPaginas, conteudo, selecionada) {
    this.matriz = matriz
    this.arrPaginas = arrPaginas
    this.conteudo = conteudo
    this.selecionada = selecionada
}