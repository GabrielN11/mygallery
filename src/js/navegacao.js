$(document).ready(function () {
    function pegarURL() {
        $('[mylink]').each((i, e) => {
            $(e).on('click', e => {
                e.preventDefault()
                const url = e.currentTarget.getAttribute('mylink')
                loadPage(url)
            })
        })
    }
    function loadPage(url) {
        const conteudo = $('.conteudo')
        conteudo.empty()
        $.ajax({
            url,
            success(data) {
                conteudo.append(data)
                this.url == 'pages/publicar.html' ? $.getScript('js/publicar.js') : $.getScript('js/feed.js')
            }
        })
    }
    $.getScript("js/feed.js")
    pegarURL()
})


