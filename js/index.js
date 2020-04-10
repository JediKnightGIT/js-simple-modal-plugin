const modal = $.modal({
  title: 'Modal example',
  closable: true,
  content: `
    <p>Content paragraph 1</p>
    <p>Content paragraph 2</p>
    <p>Content paragraph 3</p>
  `,
  width: '400px',
  footerButtons:  [
    {text: 'OK', type: 'primary', handler() {
      console.log('Primary btn clicked')
      modal.close()
    }},
    {text: 'Cancel', type: 'danger', handler() {
      console.log('Danger btn clicked')
      modal.close()
    }}
  ]
})