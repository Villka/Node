document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('PL', {
        style: 'currency',
        currency: 'PLN'
    }).format(node.textContent)
})