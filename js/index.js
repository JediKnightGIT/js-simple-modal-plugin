let vegetables = [
  {id: 1, title: 'Onion', price: 30, img: 'https://i5.walmartimages.ca/images/Enlarge/896/538/6000196896538.jpg', video: 'dZ_ELl7lTZY'},
  {id: 2, title: 'Carrot', price: 20, img: 'https://sb-assets.sgp1.cdn.digitaloceanspaces.com/product/main_image/12088/7e35b157-eb75-45c2-a26b-306b133e8e22.jpg', video: 'PV2-EZA6Xnw'},
  {id: 3, title: 'Eggplant', price: 45, img: 'https://i5.walmartimages.ca/images/Enlarge/094/510/6000200094510.jpg', video: 'YreJEe_Dw8M'},
  {id: 4, title: 'Garlic', price: 30, img: 'https://www.haifa-group.com/sites/default/files/crop/garlic%20isolated.jpg', video: 'p1H4520GlfQ'},
  {id: 5, title: 'Potato', price: 25, img: 'https://www.irishtimes.com/polopoly_fs/1.3967277.1564062363!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg', video: 'lkJ0aJNzf1g'}
]
// let player

const toHTML = vegetable => `
  <div class="col-lg-4 d-flex align-items-stretch mb-4"">
    <div class="card">
      <img class="card-img-top" src="${vegetable.img}" alt="${vegetable.title}">
      <div class="card-body">
        <h5 class="card-title">${vegetable.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${vegetable.id}">View the price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${vegetable.id}">Remove</a>
      </div>
    </div>
  </div>
`

const renderCards = () => {
  const html = vegetables.map(toHTML).join('')
  document.querySelector('#vegetables').innerHTML = html
}

renderCards()

const priceModal = $.modal({
  title: 'Product price',
  beforeClose() {
    return true
  },
  onOpen() {
  },
  onClose() {
    onModalClose()
    // document.querySelector('iframe').remove();
  },
  width: '600px',
  footerButtons:  [
    {text: 'Close', type: 'primary', handler() {
      priceModal.close()
    }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const vegetable = vegetables.find(veg => veg.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`
    <p>Price for ${vegetable.title} is <strong>$${vegetable.price}</strong></p>
    
    <div id="player" class="video-player"></div>
    `)
    // <iframe id="player" width="460" height="315" src="https://www.youtube.com/embed/${vegetable.video}?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    // </iframe>
    onModalOpen(vegetable.video)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `
        <p>You are about to remove <strong>${vegetable.title}</strong>.</p>
      `
    }).then(() => {
      vegetables = vegetables.filter(veg => veg.id !== id)
      renderCards()
    })
  }
})