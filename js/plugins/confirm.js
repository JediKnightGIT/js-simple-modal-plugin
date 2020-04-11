$.confirm = function(options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '400px',
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy()
      },
      footerButtons:  [
        {text: 'Cancel', type: 'primary', handler() {
          modal.close()
          reject()
        }},
        {text: 'Remove', type: 'danger', handler() {
          modal.close()
          resolve()
        }}
      ]
    })

    setTimeout(() => modal.open(), 100)
  })
}