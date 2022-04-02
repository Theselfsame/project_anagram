function preloaderClose() {
    document.querySelector('.container').classList.remove('hide')
    document.querySelector('.loading').remove()
}

export { preloaderClose }