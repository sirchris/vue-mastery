var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        image: './img/vmSocks-blue-onWhite.jpg',
        link:
            'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory: 9,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            { variantId: 2234, variantColor: 'blue' },
            { variantId: 2235, variantColor: 'green' }
        ]
    }
});
